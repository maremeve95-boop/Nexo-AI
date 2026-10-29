-- Nexo AI Premium & credits (Supabase Postgres)
-- Run this complete file in Supabase Dashboard -> SQL Editor.

create table if not exists public.nexo_wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  credits bigint not null default 0 check (credits >= 0),
  premium_until timestamptz,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nexo_credit_ledger (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  delta bigint not null,
  reason text not null,
  idempotency_key text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.nexo_stripe_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);

alter table public.nexo_wallets enable row level security;
alter table public.nexo_credit_ledger enable row level security;
alter table public.nexo_stripe_events enable row level security;

drop policy if exists "Users can read their own Nexo wallet" on public.nexo_wallets;
create policy "Users can read their own Nexo wallet" on public.nexo_wallets
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users can read their own Nexo credit ledger" on public.nexo_credit_ledger;
create policy "Users can read their own Nexo credit ledger" on public.nexo_credit_ledger
  for select to authenticated using (auth.uid() = user_id);
-- No user-facing INSERT/UPDATE/DELETE policies: only server-side service-role functions may modify credits.

create or replace function public.apply_nexo_purchase(
  p_event_id text,
  p_event_type text,
  p_user_id uuid,
  p_credit_delta bigint default 0,
  p_premium_until timestamptz default null,
  p_stripe_customer_id text default null
) returns jsonb
language plpgsql security definer set search_path = public
as $$
declare inserted_event text; new_balance bigint;
begin
  if p_event_id is null or p_event_id = '' or p_user_id is null then
    raise exception 'Missing event or user';
  end if;
  insert into public.nexo_stripe_events(event_id, event_type)
  values (p_event_id, coalesce(p_event_type, 'unknown'))
  on conflict (event_id) do nothing
  returning event_id into inserted_event;
  if inserted_event is null then
    return jsonb_build_object('ok', true, 'duplicate', true);
  end if;

  insert into public.nexo_wallets(user_id, credits, premium_until, stripe_customer_id)
  values (p_user_id, 0, p_premium_until, p_stripe_customer_id)
  on conflict (user_id) do nothing;

  update public.nexo_wallets
  set credits = credits + greatest(0, coalesce(p_credit_delta, 0)),
      premium_until = coalesce(p_premium_until, premium_until),
      stripe_customer_id = coalesce(p_stripe_customer_id, stripe_customer_id),
      updated_at = now()
  where user_id = p_user_id
  returning credits into new_balance;

  if coalesce(p_credit_delta, 0) > 0 then
    insert into public.nexo_credit_ledger(user_id, delta, reason, idempotency_key)
    values (p_user_id, p_credit_delta, coalesce(p_event_type, 'purchase'), 'stripe:' || p_event_id)
    on conflict (idempotency_key) do nothing;
  end if;
  return jsonb_build_object('ok', true, 'duplicate', false, 'credits', new_balance);
end;
$$;

create or replace function public.consume_nexo_credits(
  p_user_id uuid,
  p_amount bigint,
  p_request_id text
) returns jsonb
language plpgsql security definer set search_path = public
as $$
declare current_balance bigint; new_balance bigint; inserted_id bigint;
begin
  if p_user_id is null or p_amount < 1 or p_amount > 100 or p_request_id is null or p_request_id = '' then
    return jsonb_build_object('ok', false, 'balance', 0, 'error', 'invalid_request');
  end if;
  if exists(select 1 from public.nexo_credit_ledger where idempotency_key = 'consume:' || p_request_id) then
    select credits into current_balance from public.nexo_wallets where user_id = p_user_id;
    return jsonb_build_object('ok', false, 'duplicate', true, 'balance', coalesce(current_balance, 0));
  end if;
  select credits into current_balance from public.nexo_wallets where user_id = p_user_id for update;
  if current_balance is null or current_balance < p_amount then
    return jsonb_build_object('ok', false, 'balance', coalesce(current_balance, 0), 'required', p_amount);
  end if;
  insert into public.nexo_credit_ledger(user_id, delta, reason, idempotency_key)
  values (p_user_id, -p_amount, 'AI request', 'consume:' || p_request_id)
  on conflict (idempotency_key) do nothing returning id into inserted_id;
  if inserted_id is null then
    return jsonb_build_object('ok', false, 'duplicate', true, 'balance', current_balance);
  end if;
  update public.nexo_wallets set credits = credits - p_amount, updated_at = now()
  where user_id = p_user_id returning credits into new_balance;
  return jsonb_build_object('ok', true, 'balance', new_balance, 'charged', p_amount);
end;
$$;

create or replace function public.refund_nexo_credits(
  p_user_id uuid,
  p_amount bigint,
  p_request_id text,
  p_reason text default 'Provider error refund'
) returns jsonb
language plpgsql security definer set search_path = public
as $$
declare inserted_id bigint; new_balance bigint;
begin
  if p_user_id is null or p_amount < 1 or p_request_id is null or p_request_id = '' then
    return jsonb_build_object('ok', false);
  end if;
  insert into public.nexo_credit_ledger(user_id, delta, reason, idempotency_key)
  values (p_user_id, p_amount, left(coalesce(p_reason, 'Provider error refund'), 160), 'refund:' || p_request_id)
  on conflict (idempotency_key) do nothing returning id into inserted_id;
  if inserted_id is null then
    select credits into new_balance from public.nexo_wallets where user_id = p_user_id;
    return jsonb_build_object('ok', true, 'duplicate', true, 'balance', coalesce(new_balance, 0));
  end if;
  update public.nexo_wallets set credits = credits + p_amount, updated_at = now()
  where user_id = p_user_id returning credits into new_balance;
  return jsonb_build_object('ok', true, 'duplicate', false, 'balance', new_balance);
end;
$$;

revoke all on function public.apply_nexo_purchase(text,text,uuid,bigint,timestamptz,text) from public, anon, authenticated;
revoke all on function public.consume_nexo_credits(uuid,bigint,text) from public, anon, authenticated;
revoke all on function public.refund_nexo_credits(uuid,bigint,text,text) from public, anon, authenticated;
grant execute on function public.apply_nexo_purchase(text,text,uuid,bigint,timestamptz,text) to service_role;
grant execute on function public.consume_nexo_credits(uuid,bigint,text) to service_role;
grant execute on function public.refund_nexo_credits(uuid,bigint,text,text) to service_role;

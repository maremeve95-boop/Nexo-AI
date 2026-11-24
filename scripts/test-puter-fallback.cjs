'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)]
  .filter(match => !/<script\b[^>]*\bsrc\s*=/i.test(match[0]));
const code = scripts.at(-1)?.[1];
if (!code) throw new Error('No se encontró el script principal de index.html.');

function between(start, end) {
  const from = code.indexOf(start);
  if (from < 0) throw new Error('No se encontró: ' + start);
  const to = code.indexOf(end, from);
  if (to < 0) throw new Error('No se encontró el final: ' + end);
  return code.slice(from, to);
}

const context = {
  console, setTimeout, clearTimeout, Promise, DOMException, AbortController,
  signedIn: false,
  FAMILY_PROFILES: { test: { preferred: [/paid-preferred/i] } },
  availableModels: [], allModelCatalogue: [],
  getModelProvider: id => ({ free1: 'Provider A', free2: 'Provider B', free3: 'Provider C' }[id] || 'Unknown'),
  getModelInfo: id => ({ id, provider: ({ free1: 'Provider A', free2: 'Provider B', free3: 'Provider C' }[id] || 'Unknown') }),
  isEconomyModel: () => true, isChatModel: () => true, isLowCapabilityModel: () => false,
  isVisionCapableModel: () => false, supportsOpenAIWebSearch: () => false,
  supportsOpenAIReasoning: () => false, modelTaskFit: () => 0,
  modelHaystack: model => String(model?.id || model), modelEconomyScore: () => -1000000,
  sortProfileCandidates: models => models.sort((a, b) => String(a.id).localeCompare(String(b.id))),
  modelDisplayName: id => id, refreshPuterMonthlyUsage: () => Promise.resolve(),
  showToast: () => {}, optionsSeen: [],
  puter: { ai: { chat: async (...args) => {
    const options = args.at(-1);
    context.optionsSeen.push(options);
    if (options.model === 'free1') return (async function* () {
      yield { type: 'text', text: 'partial output' };
      throw Object.assign(new Error('rate limit reached'), { status: 429 });
    })();
    return (async function* () {
      yield { type: 'text', text: 'complete response from ' + options.model };
    })();
  } } }
};
context.availableModels = [{ id: 'free2' }, { id: 'free3' }];
vm.createContext(context);
vm.runInContext(between('function getErrorDetails(err){', '\nfunction describePuterWait'), context);
vm.runInContext(between('function withPuterTimeout(', '\nfunction showLimitScreen'), context);

(async () => {
  const packets = [];
  const stream = context.requestPuterStreamWithFallback({
    initialModel: 'free1', family: 'test', task: 'general', mediaFile: null,
    buildRequest: () => ({ payload: [{ role: 'user', content: 'hello' }], mediaPrompt: '', webSearch: false }),
    baseOptions: { stream: true, fallback: false },
    signal: new AbortController().signal
  });
  for await (const packet of stream) packets.push(packet);
  const attempts = packets.filter(packet => packet.__nexoAttempt).map(packet => packet.model);
  const texts = packets.filter(packet => packet.__nexoPart).map(packet => packet.part.text);
  if (attempts.length !== 2 || attempts[0] !== 'free1' || attempts[1] !== 'free2') throw new Error('Fallback inesperado: ' + JSON.stringify(attempts));
  if (texts.join('|') !== 'partial output|complete response from free2') throw new Error('Stream inesperado: ' + JSON.stringify(texts));
  if (context.optionsSeen.some(options => options.fallback !== false)) throw new Error('El fallback implícito del SDK no está desactivado.');
  if (context.classifyUsageLimit({ response: { status: 429 } }) !== 'puter-rate') throw new Error('No se ha clasificado el 429 anidado.');
  if (context.classifyUsageLimit({ message: 'HTTP status 402 payment required' }) !== 'puter-credit') throw new Error('No se ha clasificado el 402.');
  if (context.getPuterRetryAfter({ retry_after: 1200 }) !== 1200) throw new Error('Retry-After en segundos se ha interpretado mal.');
  console.log('OK fallback explícito 429 entre proveedores');
  console.log('OK fallback implícito del SDK desactivado');
  console.log('OK clasificación de 402/429');
  console.log('OK Retry-After respetado en segundos');
})().catch(error => { console.error(error); process.exitCode = 1; });

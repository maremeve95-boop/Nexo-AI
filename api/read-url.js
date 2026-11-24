'use strict';

const net = require('node:net');

function isPrivateIPv4(host) {
  const parts = host.split('.').map(Number);
  if (parts.length !== 4 || parts.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return false;
  const [a, b] = parts;
  return a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
}

function validatePublicUrl(raw) {
  let url;
  try { url = new URL(String(raw || '')); } catch { return null; }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (!host || host === 'localhost' || host.endsWith('.localhost') ||
      host.endsWith('.local') || host.endsWith('.internal') || host.endsWith('.lan') ||
      host.endsWith('.home') || host === 'metadata.google.internal') return null;
  const ipVersion = net.isIP(host);
  if (ipVersion === 4 && isPrivateIPv4(host)) return null;
  if (ipVersion === 6) {
    // Only globally routable IPv6 unicast is allowed (2000::/3).
    if (!/^[23]/i.test(host)) return null;
  }
  return url;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Utiliza POST.' });
  }

  const target = validatePublicUrl(req.body && req.body.url);
  if (!target) return res.status(400).json({ ok: false, error: 'URL no válida o privada. Solo se admiten páginas HTTP/HTTPS públicas.' });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 22000);
  try {
    const reader = await fetch('https://r.jina.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'X-Respond-With': 'markdown'
      },
      body: JSON.stringify({ url: target.href }),
      signal: controller.signal
    });
    const content = (await reader.text()).slice(0, 24000);
    if (!reader.ok) {
      return res.status(reader.status === 429 ? 429 : 502).json({
        ok: false,
        error: `El lector web respondió con HTTP ${reader.status}.`
      });
    }
    if (!content.trim()) return res.status(502).json({ ok: false, error: 'La página no contiene texto legible.' });
    const titleLine = content.split(/\r?\n/).find(line => line.trim()) || target.href;
    return res.status(200).json({
      ok: true,
      url: target.href,
      title: titleLine.replace(/^#+\s*/, '').slice(0, 180),
      content
    });
  } catch (error) {
    const timedOut = error && (error.name === 'AbortError' || error.name === 'TimeoutError');
    return res.status(timedOut ? 504 : 502).json({
      ok: false,
      error: timedOut ? 'La lectura de la página ha superado el tiempo límite.' : 'No se ha podido recuperar la página.'
    });
  } finally {
    clearTimeout(timer);
  }
};

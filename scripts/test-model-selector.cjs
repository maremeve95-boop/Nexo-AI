#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
const checks = [
  ['Nexo 4 Lite profile', /'nexo-4-lite':\{label:'Nexo 4 Lite'/.test(html)],
  ['Nexo 4.1 profile', /'nexo-4\.1':\{label:'Nexo 4\.1'/.test(html)],
  ['Nexo 6.0 Patched profile', /'nexo-6-patched':\{label:'Nexo 6\.0 Patched'/.test(html)],
  ['Profile group', /profileGroup\.label='Perfiles Nexo'/.test(html)],
  ['Live free model group', /modelGroup\.label='Modelos gratuitos de Puter · '\+models\.length/.test(html)],
  ['Catalog-based options', /availableModels\.filter\(model=>isChatModel\(model\)&&isEconomyModel\(model\)&&!isLowCapabilityModel\(model\)\)/.test(html)],
  ['Direct model choice setting', /modelChoice:'auto'/.test(html) && /settings\.modelChoice=modelId/.test(html)],
  ['Only free models enter direct selector', /if\(!model\|\|!isEconomyModel\(model\)\|\|isLowCapabilityModel\(model\)\)/.test(html)],
  ['Google/Gemini gated by live free-price metadata', /if\(\/google\|gemini\/\.test\(provider\+' '\+hay\)\)return !isCatalogFree\(m\)/.test(html)],
  ['Switching profile returns to automatic', /settings\.modelChoice='auto';settings\.family=next/.test(html)],
  ['Persisted choice survives while the catalogue is still loading', /selectedModel!=='auto'&&!hasSelectedModel&&modelCatalogueLoaded/.test(html)],
];
let failed = false;
for (const [label, ok] of checks) {
  console.log((ok ? 'OK ' : 'FAIL ') + label);
  if (!ok) failed = true;
}
if (failed) process.exit(1);
console.log('Validación del selector completada: ' + checks.length + ' comprobaciones.');

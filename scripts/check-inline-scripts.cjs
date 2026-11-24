#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const htmlPath = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
  .filter(match => !/\bsrc\s*=/.test(match[1]));
if (!scripts.length) {
  console.error('No se encontraron scripts inline en index.html.');
  process.exit(1);
}
let failures = 0;
scripts.forEach((match, index) => {
  const source = match[2];
  if (!source.trim()) return;
  try {
    new vm.Script(source, { filename: \`index.html:inline-script-\${index + 1}\` });
    console.log(\`OK  inline script \${index + 1}\`);
  } catch (error) {
    failures += 1;
    console.error(\`FAIL inline script \${index + 1}: \${error.message}\`);
  }
});
if (failures) process.exit(1);
console.log(\`Validación completada: \${scripts.length} bloques inline inspeccionados.\`);

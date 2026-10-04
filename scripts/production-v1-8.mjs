import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const base = 'https://kujo.robertdevore.com';
const checks = {
  '/': ['Verified against 1.8.0'],
  '/course/setup-and-cli/': ['npm install --global @kujolang/kujo-runtime@1.8.0', 'Windows x64'],
  '/course/optional-typing/': ['The advisory analyzer now follows nested collection destructuring', 'genuinely dynamic'],
  '/course/editor-and-lsp/': ['shares one analyzed-program model', 'does not keep serving stale exports'],
  '/course/structs-and-enums/': ['generator methods declared with <code>func*</code>', 'shared alias progress'],
  '/evidence/': ['Observed 1.8.0 VM', 'Struct assignment and qualified custom-enum matching remain discrepancies'],
};
const receipts = [];

for (const [route, needles] of Object.entries(checks)) {
  const response = await fetch(base + route, {signal: AbortSignal.timeout(20000)});
  assert.equal(response.status, 200, route);
  const body = await response.text();
  for (const needle of needles) assert.ok(body.includes(needle), `${route}: ${needle}`);
  receipts.push({route, status: response.status, sha256: createHash('sha256').update(body).digest('hex'), checks: needles});
}

const result = await fetch(base + '/verification.json', {signal: AbortSignal.timeout(20000)});
assert.equal(result.status, 200);
assert.equal((await result.json()).version, '1.8.0');

fs.writeFileSync('evidence/production-v1-8.json', JSON.stringify({
  verifiedAt: new Date().toISOString(),
  base,
  receipts,
  verificationVersion: '1.8.0',
  status: 'passed',
}, null, 2) + '\n');
console.log('PASS: six public 1.8 pages, installation guidance, analysis updates, struct generators, and published receipts');

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const binary=process.env.KUJO_BIN||path.resolve('.tools/kujo');
const env={...process.env};for(const key of Object.keys(env))if(/^(KUJO_|OPENAI_|ANTHROPIC_)/.test(key))delete env[key];
const receipts=[];
for(const name of ['control','closure','generator']) {
 let expected;
 for(const mode of ['vm','interpreter']) {
  const args=['run','--untrusted',...(mode==='interpreter'?['--interpreter']:[]),`examples/supplemental/v1-6-${name}.kujo`];
  const r=spawnSync(binary,args,{env,encoding:'utf8',timeout:5000});
  assert.ifError(r.error);assert.equal(r.status,0,r.stderr);
  if(expected!==undefined)assert.equal(r.stdout,expected);expected=r.stdout;
  receipts.push({args,mode,exit:r.status,stdout:r.stdout,stderr:r.stderr});
 }
}
const probes=JSON.parse(fs.readFileSync('evidence/runtime-discrepancies.json')).probes;
const loop=probes.find(p=>p.name==='loop_control');
assert.equal(loop.modes.vm.exit,0);assert.equal(loop.modes.vm.stdout,'[2, 4]\n');assert.equal(loop.modes.vm.stdout,loop.modes.interpreter.stdout);
fs.writeFileSync('evidence/v1-6-checks.json',JSON.stringify({version:'1.8.0',date:'2026-10-04',receipts,loopControlParity:true},null,2)+'\n');
console.log('PASS: 6 loop-return/closure/generator executions with exact parity; break/continue parity');

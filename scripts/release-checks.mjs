import fs from 'node:fs';import assert from 'node:assert/strict';import path from 'node:path';import {spawnSync} from 'node:child_process';
const binary=process.env.KUJO_BIN||path.resolve('.tools/kujo');const env={...process.env};for(const k of Object.keys(env))if(/^(KUJO_|OPENAI_|ANTHROPIC_)/.test(k))delete env[k];const receipts=[];
function run(args,exit,text){const r=spawnSync(binary,args,{encoding:'utf8',env,timeout:5000});assert.ifError(r.error);assert.equal(r.status,exit,r.stderr);assert.ok((r.stdout+r.stderr).includes(text),JSON.stringify(r));receipts.push({args,exit:r.status,stdout:r.stdout,stderr:r.stderr});}
fs.mkdirSync('work',{recursive:true});
for(const mode of [[],['--interpreter']]){
run(['run','--untrusted',...mode,'examples/supplemental/v1-4-values.kujo'],0,'HTML tokens verified');
run(['run','--untrusted',...mode,'examples/supplemental/v1-4-callback.kujo'],0,'imported callback verified');
run(['run','--untrusted','--isolated-imports',...mode,'examples/02.kujo'],0,'Kujo');
run(['run','--untrusted','--allow-fs-write',...mode,'examples/supplemental/v1-4-publication.kujo'],0,'publication verified');
run(['run','--untrusted',...mode,'examples/supplemental/v1-4-publication.kujo'],4,'Capability denied: filesystem-write');
}
const original=JSON.parse(fs.readFileSync('evidence/history/v1.3.1/runtime-discrepancies.json'));const probes=[];
for(const p of original.probes){const modes={};for(const mode of ['vm','interpreter']){const r=spawnSync(binary,['run','--untrusted',...(mode==='interpreter'?['--interpreter']:[]),p.file],{encoding:'utf8',env,timeout:2000});modes[mode]={exit:r.status,signal:r.signal,stdout:r.stdout,stderr:r.stderr,timeout:r.error?.code==='ETIMEDOUT'};}probes.push({...p,modes});}
for(const name of ['loop_scope','loop_declaration']){const p=probes.find(x=>x.name===name);assert.equal(p.modes.vm.exit,p.modes.interpreter.exit);assert.equal(p.modes.vm.stdout,p.modes.interpreter.stdout);assert.equal(p.modes.vm.timeout,false);}
fs.writeFileSync('evidence/runtime-discrepancies.json',JSON.stringify({version:'1.5.0',date:'2026-09-23',probes},null,2)+'\n');
fs.writeFileSync('evidence/release-checks.json',JSON.stringify({version:'1.5.0',date:'2026-09-23',receipts},null,2)+'\n');console.log('PASS: 10 release checks and 7 dual-runtime discrepancy probes');

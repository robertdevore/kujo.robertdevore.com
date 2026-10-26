import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
const binary=process.env.KUJO_BIN||path.resolve('.tools/kujo'),env={...process.env},receipts=[];
for(const k of Object.keys(env))if(/^(KUJO_|OPENAI_|ANTHROPIC_)/.test(k))delete env[k];
env.KUJO_AI_REPLAY_MODE='strict';fs.mkdirSync('work/v1-9',{recursive:true});
const cases=[
 ['success',null,0,'Nested writes, bytes, callbacks, CSV and numeric contracts verified'],
 ['utf8','utf8_decode(bytes([255]))',4,'invalid UTF-8 at byte 0'],
 ['byte','mut b := bytes([65])\nb[0] = 256',4,'0-255'],
 ['comparator','func cmp(a,b) { return true }\nsort_by([2,1], cmp)',4,'comparator must return an integer'],
 ['callback','func replacement(groups) { os_environ() return "x" }\nregex_replace_with("a", "a", replacement)',4,'env-read'],
 ['csv','parse_csv_rows("a,b\\nc\\n")',4,'CSV record error'],
 ['precision','format_fixed(1.2, 101)',4,'precision in 0..=100'],
 ['index','mut a := [1]\na[0.5] = 2',4,'index assignment'],
 ['overflow','print(9223372036854775807 + 1)',4,'overflow'],
];
for(const mode of [[],['--interpreter']])for(const [name,source,exit,reason] of cases){
 const file=source===null?'examples/supplemental/v1-9-contracts.kujo':`work/v1-9/${name}.kujo`;if(source!==null)fs.writeFileSync(file,source+'\n');
 const args=['run','--untrusted',...mode,file];const r=spawnSync(binary,args,{env,encoding:'utf8',timeout:10000});assert.ifError(r.error);assert.equal(r.status,exit,`${name}: ${r.stderr}`);assert.ok((r.stdout+r.stderr).toLowerCase().includes(reason.toLowerCase()),`${name}: ${r.stderr}`);receipts.push({name,args,exit:r.status,stdout:r.stdout,stderr:r.stderr});
}
fs.writeFileSync('evidence/v1-9-checks.json',JSON.stringify({version:'1.9.0',date:'2026-10-25',receipts},null,2)+'\n');console.log(`PASS: ${receipts.length} Kujo 1.9 contract checks in VM and interpreter`);

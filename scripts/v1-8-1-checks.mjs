import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
const binary=process.env.KUJO_BIN||path.resolve('.tools/kujo'),env={...process.env},receipts=[];
for(const k of Object.keys(env))if(/^(KUJO_|OPENAI_|ANTHROPIC_)/.test(k))delete env[k];
env.KUJO_AI_REPLAY_MODE='strict';fs.mkdirSync('work/v1-8-1',{recursive:true});
const cases=[
 ['success',null,[],0,'CSV, collections, schema and AI identity verified'],
 ['overflow','sum([9223372036854775807, 1])',[],4,'overflow'],
 ['csv-duplicate','parse_csv("name,name\\na,b\\n")',[],4,'duplicate'],
 ['csv-extra','to_csv([{"a":1},{"a":2,"b":3}])',[],4,'column absent from the first row'],
 ['schema-unvisited','json_schema_validate([], {"properties":{"absent":{"minimum":"bad"}}})',[],4,'minimum'],
 ['env-denied','os_environ()', ['--allow-fs-read'],4,'env-read'],
 ['env-allowed','os_environ()\nprint("environment access allowed")',['--allow-env-read'],0,'environment access allowed'],
 ['copy-read-denied','copy_file("work/v1-8-1/source", "work/v1-8-1/copy")',['--allow-fs-write'],4,'filesystem-read'],
 ['copy-allowed','copy_file("work/v1-8-1/source", "work/v1-8-1/copy")\nprint("copy allowed")',['--allow-fs-read','--allow-fs-write'],0,'copy allowed'],
];
fs.writeFileSync('work/v1-8-1/source','fixture');
for(const mode of [[],['--interpreter']])for(const [name,source,flags,exit,reason] of cases){
 const file=source===null?'examples/supplemental/v1-8-1-contracts.kujo':`work/v1-8-1/${name}.kujo`;if(source!==null)fs.writeFileSync(file,source+'\n');
 const args=['run','--untrusted',...mode,...flags,file];const r=spawnSync(binary,args,{env,encoding:'utf8',timeout:10000});assert.ifError(r.error);assert.equal(r.status,exit,`${name}: ${r.stderr}`);assert.ok((r.stdout+r.stderr).toLowerCase().includes(reason.toLowerCase()),`${name}: ${r.stderr}`);receipts.push({name,args,exit:r.status,stdout:r.stdout,stderr:r.stderr});
}
fs.writeFileSync('evidence/v1-8-1-checks.json',JSON.stringify({version:'1.9.0',date:'2026-10-25',receipts},null,2)+'\n');console.log(`PASS: ${receipts.length} maintenance-contract checks in VM and interpreter`);

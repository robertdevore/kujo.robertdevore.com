import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
export const root=process.cwd();
export const binary=process.env.KUJO_BIN || (fs.existsSync('.tools/kujo') ? path.resolve('.tools/kujo') : 'kujo');
const env={...process.env};for(const key of Object.keys(env))if(/^(KUJO_|OPENAI_|ANTHROPIC_|AZURE_OPENAI_)/.test(key))delete env[key];
env.KUJO_AI_REPLAY_MODE='strict';
export function run(args,{cwd=root,extraEnv={},timeout=15000}={}){const result=spawnSync(binary,args,{cwd,encoding:'utf8',env:{...env,...extraEnv},timeout,maxBuffer:4*1024*1024});assert.ifError(result.error);return {exit:result.status,stdout:result.stdout,stderr:result.stderr};}
const course=JSON.parse(fs.readFileSync('course.json'));
assert.equal(run(['--version']).stdout.trim(),'kujo 1.3.1');
const reasons=['Assertion failed',"Expected ')'",'Cannot mutate immutable','Integer overflow','Undefined variable','expects 2 arguments','Missing map key','Duplicate declaration','Cannot convert','Index out of bounds','denominator must be nonzero','Invalid binary operation','async operation rejected','worker rejected','Module not found','Assertion failed','JSON parse error','Assertion failed','report validation failed','expects 1 arguments',"Expected ')'",'invalid_relative_path','non-empty array','Capability denied: network-client','JSON parse error','Capability denied: filesystem-write','Assertion failed','Capability denied: network-ai','Assertion failed','replay_miss','third argument must be a function','Assertion failed','dimension mismatch','max_steps','Assertion failed','Assertion failed','Assertion failed','Assertion failed','Assertion failed','Assertion failed'];
const expected=JSON.parse(fs.readFileSync('fixtures/expected.json'));
const evidence={version:'1.3.1',verifiedDate:'2026-09-06',binarySha256:createHash('sha256').update(fs.readFileSync(binary)).digest('hex'),lessons:{},commands:{}};
for(const [i,l] of course.lessons.entries()){
 const file=`examples/${l.id}.kujo`;
 const check=run(['check','--json',file]);assert.equal(check.exit,0,`${file}: ${check.stderr}`);assert.equal(JSON.parse(check.stdout).status,'ok');
 const success=run(['run','--untrusted',...l.flags,file]);assert.equal(success.exit,0,`${file}: ${success.stderr}`);assert.equal(success.stdout,expected[l.id],`${file} stdout changed`);
 const failure=run(['run','--untrusted',...l.flags,`examples/${l.id}-break.kujo`]);assert.equal(failure.exit,['02','21'].includes(l.id)?3:4,`${l.id} wrong failure category`);assert.ok(failure.stderr.includes(reasons[i]),`${l.id}: unrelated error: ${failure.stderr}`);
 evidence.lessons[l.id]={sourceSha256:createHash('sha256').update(fs.readFileSync(file)).digest('hex'),flags:l.flags,check,success,failure};
}
for(const [key,args] of Object.entries({check:['check','--json','examples/02.kujo'],doctor:['doctor'],lsp:['lsp-diagnostics','examples/21-break.kujo','--json'],docgen:['docgen','examples/20.kujo','--out-dir','work/docgen','--no-builtins','--json'],runtimeDiagnostic:['run','--untrusted','--json-runtime-diagnostics','examples/19-break.kujo']})){
 const result=run(args);evidence.commands[key]={args,...result};if(key==='runtimeDiagnostic'){assert.equal(result.exit,4);assert.equal(JSON.parse(result.stdout).status,'error');}else if(key!=='lsp')assert.equal(result.exit,0,`${key}: ${result.stderr}`);
}

for(const [name,args,extraEnv,expectedExit,expectedText] of [
 ['embedding',['run','--untrusted','--allow-ai','examples/supplemental/embedding.kujo'],{},0,'['],
 ['endpointDenied',['run','--untrusted','--allow-ai','examples/supplemental/endpoint-denial.kujo'],{KUJO_AI_ALLOWED_ENDPOINTS:'https://approved.example.test/v1'},0,'endpoint_denied'],
 ['aiSeparate',['run','--untrusted','--allow-net-client','examples/28-break.kujo'],{},4,'Capability denied: network-ai'],
 ['privateNetworkDenied',['run','--untrusted','--allow-net-client','--deny-private-net','examples/24-break.kujo'],{},4,'destination policy'],
 ['spawn',['run','--untrusted','examples/supplemental/spawn.kujo'],{},0,'spawn accepted']
]){const result=run(args,{extraEnv});assert.equal(result.exit,expectedExit);assert.ok((result.stdout+result.stderr).includes(expectedText),name+': '+result.stderr);evidence.commands[name]={args,...result};}

fs.mkdirSync('evidence',{recursive:true});fs.writeFileSync('evidence/verification.json',JSON.stringify(evidence,null,2)+'\n');
console.log('PASS: 40 checked VM examples, 40 verified intentional failures, and CLI/DocGen/LSP receipts');

import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {createHash} from 'node:crypto';import {fixture} from './http-fixture.mjs';
const root=process.cwd(),binary=process.env.KUJO_BIN||path.join(root,'.tools/kujo');
const env={...process.env};for(const k of Object.keys(env))if(/^(KUJO_|OPENAI_|ANTHROPIC_)/.test(k))delete env[k];
const receipts=[];
async function run(args,{cwd=root,extraEnv={},expected=0}={}){const r=await new Promise((resolve,reject)=>{const p=spawn(binary,args,{cwd,env:{...env,...extraEnv}});let stdout='',stderr='';const timer=setTimeout(()=>p.kill('SIGKILL'),15000);p.stdout.on('data',c=>stdout+=c);p.stderr.on('data',c=>stderr+=c);p.on('error',reject);p.on('exit',(exit,signal)=>{clearTimeout(timer);resolve({exit,signal,stdout,stderr});});});assert.equal(r.exit,expected,`${args.join(' ')}: ${r.stderr}`);receipts.push({args,cwd:cwd===root?'.':path.relative(root,cwd).startsWith('..')?'temporary independent copy':path.relative(root,cwd),...r});return r;}
fs.mkdirSync('work',{recursive:true});
const report=await run(['run','--untrusted','projects/report/main.kujo','--','jobs','alpha','beta']);assert.equal(report.stdout,'Accepted jobs: 2\n- alpha\n- beta\n');
const empty=await run(['run','--untrusted','projects/report/main.kujo'],{expected:4});assert.match(empty.stderr,/at least one job/);
for(const file of ['concurrent/main.kujo','workflow/main.kujo'])await run(['run','--untrusted','projects/'+file]);
await run(['run','--untrusted','--allow-database','projects/native/database.kujo']);
await run(['run','--untrusted','--allow-ai','projects/ai/main.kujo']);
const server=fixture();await new Promise(r=>server.once('listening',r));
try{const r=await run(['run','--untrusted','--allow-fs-read','--allow-fs-write','--allow-process-exec','--allow-net-client','projects/native/main.kujo'],{extraEnv:{KUJO_ALLOW_PRIVATE_NETWORK_DESTINATIONS:'1'}});assert.match(r.stdout,/"status":200/);assert.equal(JSON.parse(fs.readFileSync('work/automation.json')).process_ok,true);}finally{await new Promise(r=>server.close(r));}
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'kujo-course-test-'));
try{
 for(const project of ['package','capstone']){
  const cwd=path.join(temp,project);fs.cpSync('projects/'+project,cwd,{recursive:true,filter:p=>!p.split(path.sep).includes('work')});fs.mkdirSync(path.join(cwd,'work'),{recursive:true});
  const before=fs.readFileSync(path.join(cwd,'kujo.lock'),'utf8');await run(['package-install','--frozen'],{cwd});assert.equal(fs.readFileSync(path.join(cwd,'kujo.lock'),'utf8'),before);
  await run(['test-run','--untrusted','--verbose','tests.kujo'],{cwd});
  const flags=project==='capstone'?['--allow-fs-read','--allow-fs-write','--allow-ai']:[];
  const result=await run(['run','--untrusted',...flags,'src/main.kujo'],{cwd});JSON.parse(result.stdout);
  if(project==='capstone'){
    const packet=JSON.parse(result.stdout);assert.equal(packet.verdict,'PASS');assert.equal(packet.steps,2);assert.equal(packet.tool.result,2);assert.equal(packet.evaluated,true);
    const repeat=await run(['run','--untrusted',...flags,'src/main.kujo'],{cwd});assert.equal(repeat.stdout,result.stdout);
    const requestFile=path.join(cwd,'fixtures/request.json'),original=fs.readFileSync(requestFile,'utf8');
    for(const request of [{goal:'shell',jobs:[],max_steps:2},{goal:'count_jobs',jobs:[],max_steps:3}]){fs.writeFileSync(requestFile,JSON.stringify(request));const fail=await run(['run','--untrusted',...flags,'src/main.kujo'],{cwd,expected:1});assert.equal(JSON.parse(fail.stdout).reason,'invalid_request');}
    fs.writeFileSync(requestFile,original);
    fs.rmSync(path.join(cwd,'work/evidence.json'));
    const noWrite=await run(['run','--untrusted','--allow-fs-read','--allow-ai','src/main.kujo'],{cwd,expected:1});assert.equal(JSON.parse(noWrite.stdout).verdict,'STOP');assert.equal(fs.existsSync(path.join(cwd,'work/evidence.json')),false);
    fs.renameSync(path.join(cwd,'fixtures/cassettes'),path.join(cwd,'fixtures/cassettes-away'));
    const miss=await run(['run','--untrusted',...flags,'src/main.kujo'],{cwd,expected:1});assert.equal(JSON.parse(miss.stdout).reason,'ai_response_rejected');
  }
  fs.appendFileSync(path.join(cwd,'kujo.toml'),'\ncourse_missing = "1.0.0"\n');const drift=await run(['package-install','--frozen'],{cwd,expected:4});assert.match(drift.stderr,/lock|frozen|sync/i);
 }
}finally{fs.rmSync(temp,{recursive:true,force:true});}
fs.writeFileSync('evidence/projects.json',JSON.stringify({version:'1.3.1',verifiedDate:'2026-09-06',receipts},null,2)+'\n');console.log(`PASS: ${receipts.length} project, package, HTTP, database, replay, and capstone checks`);

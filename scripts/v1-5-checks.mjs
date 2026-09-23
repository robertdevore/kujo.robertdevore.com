import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const binary=process.env.KUJO_BIN||path.resolve('.tools/kujo');
const env={...process.env};for(const key of Object.keys(env))if(/^(KUJO_|OPENAI_|ANTHROPIC_)/.test(key))delete env[key];
const receipts=[];
function run(file,mode,flags,expectedExit,expectedText,input='') {
 const args=['run','--untrusted',...mode,...flags,file];
 const r=spawnSync(binary,args,{encoding:'utf8',env,input,timeout:15000});
 assert.ifError(r.error);assert.equal(r.status,expectedExit,r.stderr);
 assert.ok((r.stdout+r.stderr).includes(expectedText),JSON.stringify(r));
 receipts.push({args,exit:r.status,stdout:r.stdout,stderr:r.stderr,input:Buffer.isBuffer(input)?'invalid UTF-8 fixture':input});
}
function probe(name,source){const file=`work/v1-5/${name}.kujo`;fs.writeFileSync(file,source+'\n');return file;}
fs.mkdirSync('work/v1-5/source',{recursive:true});fs.mkdirSync('work/v1-5/target',{recursive:true});
fs.writeFileSync('work/v1-5/source/a.json','{}\n');fs.writeFileSync('work/v1-5/source/a-b.json','{}\n');
for(const mode of [[],['--interpreter']]){
 fs.rmSync('work/v1-5/target/copy.json',{force:true});
 const files='examples/supplemental/v1-5-files.kujo';
 run(files,mode,['--allow-fs-read','--allow-fs-write'],0,'bounded files verified');
 assert.equal(fs.readFileSync('work/v1-5/target/copy.json','utf8'),'{}\n');
 run(files,mode,[],4,'Capability denied: filesystem-read');
 run(files,mode,['--allow-fs-read'],4,'Capability denied: filesystem-write');
 run(files,mode,['--allow-fs-read','--allow-fs-write'],4,'publish_failed');
 assert.equal(fs.readFileSync('work/v1-5/target/copy.json','utf8'),'{}\n');
 run('examples/supplemental/v1-5-stdin.kujo',mode,[],0,'" a\\n"',' a\n');
 run('examples/supplemental/v1-5-stdin.kujo',mode,[],4,'exceeds byte limit','abcde');
 run('examples/supplemental/v1-5-stdin.kujo',mode,[],4,'not valid UTF-8',Buffer.from([255]));
 run('examples/supplemental/v1-5-token.kujo',mode,['--allow-random'],0,'***');
 run('examples/supplemental/v1-5-token.kujo',mode,[],4,'random required for secure_random_token');
 run('examples/supplemental/v1-5-scope.kujo',mode,[],0,'lexical scope verified');
 run('examples/supplemental/v1-5-pdf.kujo',mode,[],0,'PDF digest repeatable');
 run(probe('oversize','sha256_file_beneath("work/v1-5/source", "a.json", 1)'),mode,['--allow-fs-read'],4,'size_limit_exceeded');
 run(probe('scan-ceiling','list_dir_beneath("work/v1-5", "source", "", ".json", 1, 1)'),mode,['--allow-fs-read'],4,'');
 run(probe('pdf-remote','pdf_render_html("<img src=\\"https://example.test/logo.png\\" />", {}, {})'),mode,[],4,'unsupported or unsafe pdf HTML attribute');
 run(probe('dates','assert(parse_datetime("2026-09-16T09:30:00-04:00") == 1789565400)\nassert(format_date_tz(1789565400, "YYYY-MM-DD HH:mm", "America/Detroit") == "2026-09-16 09:30")\nprint("dates verified")'),mode,['--allow-clock'],0,'dates verified');
}
fs.writeFileSync('evidence/v1-5-checks.json',JSON.stringify({version:'1.5.0',date:'2026-09-23',receipts},null,2)+'\n');
console.log(`PASS: ${receipts.length} Kujo 1.5 bounded-input, file, security, PDF, date and scope checks`);

// One-time migration of synthetic fixtures. Responses remain unchanged.
// Kujo 1.8.1 preserves assistant call records and tool reply IDs in request hashes.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const canonical=v=>Array.isArray(v)?v.map(canonical):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
for(const dir of ['fixtures/tool-loop','projects/capstone/fixtures/cassettes']){
 for(const name of fs.readdirSync(dir).filter(x=>x.endsWith('.json'))){
  const file=dir+'/'+name,c=JSON.parse(fs.readFileSync(file));const messages=c.request_meta.normalized.body.messages;
  if(!messages.some(m=>m.role==='tool'))continue;
  const oldHash=c.request_meta.hash;
  for(const m of messages){if(m.role==='assistant'){m.content=null;m.tool_calls=[{id:'course_call_1',type:'function',function:{name:'count_jobs',arguments:'{}'}}];}if(m.role==='tool')m.tool_call_id='course_call_1';}
  c.request_meta.normalized=canonical(c.request_meta.normalized);
  const hash=createHash('sha256').update(JSON.stringify(c.request_meta.normalized)).digest('hex');c.request_meta.hash=hash;if(hash===oldHash)continue;
  fs.writeFileSync(dir+'/'+hash+'.json',JSON.stringify(c,null,2)+'\n');fs.unlinkSync(file);console.log(`${dir}: ${oldHash} -> ${hash}`);
 }
}

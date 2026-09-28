import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const base='https://kujo.robertdevore.com';
const checks={
 '/':['Verified against 1.6.0'],
 '/course/setup-and-cli/':['npm install --global @kujolang/kujo-runtime@1.6.0','Windows x64'],
 '/course/control-flow/':['first_positive','loop return verified'],
 '/course/scope-and-capture/':['Aliases and repeated calls','snapshots'],
 '/course/async-and-await/':['func* sequence','Async generators and struct generator methods'],
 '/course/mechanism-and-policy/':['experimental beta','experimental alpha','private/unpublished'],
 '/course/evidence-and-handoffs/':['kujo.interop-handoff/v1alpha1','Dispatch decides replay'],
 '/evidence/':['Observed 1.6.0 VM','Struct assignment and qualified custom-enum matching remain discrepancies']
};
const receipts=[];
for(const [route,needles] of Object.entries(checks)){
 const response=await fetch(base+route);assert.equal(response.status,200,route);
 const body=await response.text();for(const needle of needles)assert.ok(body.includes(needle),route+': '+needle);
 assert.ok(!body.includes('[email&#160;protected]'),route);
 receipts.push({route,status:response.status,sha256:createHash('sha256').update(body).digest('hex'),checks:needles});
}
const result=await fetch(base+'/verification.json');assert.equal(result.status,200);assert.equal((await result.json()).version,'1.6.0');
fs.writeFileSync('evidence/production-v1-6.json',JSON.stringify({date:new Date().toISOString(),base,receipts,verificationVersion:'1.6.0',status:'passed'},null,2)+'\n');
console.log('PASS: eight public 1.6 pages, exact npm command, experimental boundaries and published receipts');

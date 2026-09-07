import http from 'node:http';
export function fixture(port=4190){return http.createServer((req,res)=>{res.writeHead(req.url==='/health'?200:404,{'content-type':'application/json'});res.end(JSON.stringify({ok:req.url==='/health'}));}).listen(port,'127.0.0.1');}
if(process.argv[1]?.endsWith('http-fixture.mjs')){fixture();console.log('Local fixture: http://127.0.0.1:4190/health');}

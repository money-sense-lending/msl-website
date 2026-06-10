const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.mp4':'video/mp4','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);
  let fp=path.join(root,p);
  try{ if(fs.statSync(fp).isDirectory()) fp=path.join(fp,'index.html'); }catch(e){}
  fs.readFile(fp,(err,data)=>{
    if(err){res.writeHead(404);res.end('404 '+p);return;}
    res.writeHead(200,{'Content-Type':types[path.extname(fp)]||'application/octet-stream'});
    res.end(data);
  });
}).listen(process.env.PORT||8099,()=>console.log("serving on "+(process.env.PORT||8099)));

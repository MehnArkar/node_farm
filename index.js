const fs = require('fs');
const http = require('http');

// const textIn=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = fs.writeFileSync('./txt/output.txt','This is what we know about avocado : ${textIn}.\nCreate on ${Date.now()}');
// console.log('file written');


const tempOverview = fs.readFileSync('./templates/overview.html','utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html','utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html','utf-8');

var server =http.createServer((req,res)=>{
   const pathName = req.url;
   if(pathName==='/' || pathName==='/overview'){
    res.end(tempOverview);
   }else  if(pathName==='/card'){
    res.end(tempCard);
   }else  if(pathName==='/product'){
    res.end(tempProduct);
   }
    
})

server.listen(3000,'127.0.0.1',()=>{
   console.log('server start');

})


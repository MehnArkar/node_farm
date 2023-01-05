const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

// const textIn=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = fs.writeFileSync('./txt/output.txt','This is what we know about avocado : ${textIn}.\nCreate on ${Date.now()}');
// console.log('file written');

const replaceTemplate = (temp, product) => {
   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
   output = output.replace(/{%IMAGE%}/g, product.image);
   output = output.replace(/{%PRICE%}/g, product.price);
   output = output.replace(/{%FROM%}/g, product.from);
   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
   output = output.replace(/{%QUANTITY%}/g, product.quantity);
   output = output.replace(/{%DESCRIPTION%}/g, product.description);
   output = output.replace(/{%ID%}/g, product.id);

   if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
   return output;
};

const tempOverview = fs.readFileSync('./templates/overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

var server = http.createServer((req, res) => {

   let {query,pathname} = url.parse(req.url);

   if(pathname==='/' || pathname==='/overview'){
    res.writeHead(200,{'Content-type':'text/html'});
    const cardsHtml = dataObj.map(el=>replaceTemplate(tempCard,el));
    const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
    res.end(output);

   }else  if(pathname==='/card'){
    res.end(tempCard);

   }else  if(pathname==='/product'){
      res.writeHead(200,{'Content-type':'text/html'});
   
      const product = dataObj[query.substring(3,query.length)];
      const output = replaceTemplate(tempProduct,product);
      res.end(output);
   }else if(pathname ==='/api'){
      res.writeHead(200,{'Content-type':'application/json'});
      res.end(data);

   }

})

server.listen(3000, '127.0.0.1', () => {
   console.log('server start');

})


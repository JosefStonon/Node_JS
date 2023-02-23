const http = require('http');
const {URL} = require('url');
const router = require('./router');


const server = http.createServer((req, res) => {
  const parseObj = new URL(`http://localhost:3000${req.url}`);

  console.log(` Endpoint: ${parseObj.pathname} | Method: ${req.method}`);

 
let {pathname} = parseObj;
let id = null;

const splitObj = pathname.split('/').filter(Boolean);

if (splitObj.length > 1) {
  pathname = `/${splitObj[0]}/:id`;
  id = splitObj[1];
};

const route = router.find((routeObj) => (
  routeObj.endpoint === pathname && routeObj.method === req.method
));


if(route) {
  req.query = Object.fromEntries(parseObj.searchParams);
  req.params = { id };

  res.send = (statusCode, body) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json'})
    res.end(JSON.stringify(body));
  }


  route.handler(req, res);
} else {
  res.writeHead(404, { 'Content-Type': 'text/html'})
  res.end(`Cannot ${parseObj.pathname} ${req.method} `)
}

 
});

server.listen(3000, () => console.log('🔥 Server has been started at http://localhost:3000'))
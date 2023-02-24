const http = require('http');
const { URL } = require('url');


const bodyParser = require('./src/Helpers/bodyParser')
const router = require('./router');

const server = http.createServer((req, res) => {
  const parseURL = new URL(`http://localhost:3000${req.url}`);
  console.log(`Endpoint: ${parseURL.pathname} | Method: ${req.method}`);

  let {pathname} = parseURL;
  let id = null;

  const splitUrl = pathname.split('/').filter(Boolean);

  if(splitUrl.length > 1) {
    pathname = `/${splitUrl[0]}/:id`;
    id = splitUrl[1];
  }
  
  const route = router.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === req.method
  ));

  if(route) {
    req.query = Object.fromEntries(parseURL.searchParams);
    req.params = {id};


    res.send = (statusCode, body) => {
      res.writeHead(statusCode, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(body))
    }

    if ([ 'POST', 'PUT', 'PATH' ].includes(req.method)) {
      bodyParser(req, () => route.handler(req, res))
    } else {
      route.handler(req, res)
    }
    
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end(`Cannot ${parseURL.pathname} ${req.method}`)
  }

});

server.listen(3000, () => console.log('🔥 Server has been started at http://localhost:3000'))
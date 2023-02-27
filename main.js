const http = require('http');
const {URL} = require('url');

const parseUser = require('./src/Helpers/ParseUsers');

const router = require('./router');


const server = http.createServer((req, res) => {
  const listObj = new URL(`http://localhost:3000${req.url}`);
  console.log(` Endpoint: ${listObj.pathname} | Method: ${req.method}`);

  let { pathname } = listObj;
  let id = null;

  const ObjSplit = pathname.split('/').filter(Boolean);

  if(ObjSplit.length > 1) {
    pathname = `/${ObjSplit[0]}/:id`;
    id = ObjSplit[1];
  }



  const route = router.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === req.method
  ));

  if(route) {
    req.query = Object.fromEntries(listObj.searchParams);
    req.params = { id };

    res.send = (statusCode, body) => {
      res.writeHead(statusCode, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(body))
    }

    if(['POST', 'PUT', 'PATH'].includes(req.method)) {
      parseUser(req, () => route.handler(req, res))
    } else {
      route.handler(req, res)
    }


  } else {
    res.writeHead(400, {'Content-Type': 'text/html'})
    res.end(`Cannot ${listObj.pathname} ${req.method}`)
  }
})

server.listen(3000, () => console.log('Server has been started at http://localhost:3000'))
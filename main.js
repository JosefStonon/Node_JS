const http = require('http');
const {URL} = require('url');

const router = require('./router');

const server = http.createServer((req, res) => {
  const parseUser = new URL(`http://localhost:3000${req.url}`);
console.log(`Endpoint: ${parseUser.pathname} | Method: ${req.method}`);

let {pathname} = parseUser;
let id  = null;



const splitObj = pathname.split('/').filter(Boolean);

if (splitObj.length > 1) {
  pathname = `/${splitObj[0]}/:id`;
  id = splitObj[1];
};

const route = router.find((routeObg) => (
  routeObg.endpoint === pathname && routeObg.method === req.method
));


if (route) {
  req.query = Object.fromEntries(parseUser.searchParams);
  req.params = {id};

  route.handler(req, res)
} else {
  res.writeHead(404, {'Content-Type': 'text/html'})
  res.end(`Cannot ${parseUser.pathname} ${req.method}`)
};

})

server.listen(3000, () => console.log('🔥 Server has been started http://localhost:3000'));
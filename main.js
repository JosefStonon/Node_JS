const http = require('http');
const { URL } = require('url');


const routes = require('./router');



const server = http.createServer((req, res) =>  {
  const objUrl = new URL(`http://localhost:3000${req.url}`) //cria-se uma nova instancia para dividir a url em parametros de objeto.
  console.log(`Endpoint: ${objUrl.pathname} | Method: ${req.method}`);

    let { pathname } = objUrl;
    let id = null;

    const splitEndpoint = pathname.split('/').filter(Boolean);
  

      if (splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`;
        id = splitEndpoint[1];
      }

    const route = routes.find((routeObj) => (
      routeObj.endpoint === pathname && routeObj.method === req.method
    ));

    if (route) {
    req.query = Object.fromEntries(objUrl.searchParams);//quando parseUrl recebeu recebeu a instancia de um objeto, o parametro query dentro deste objeto nao existe mais. Então pega-se o Object e adiciona o fromEntries para converter e transformar o searchParams em objeto. 
    req.params = { id };
      route.handler(req, res)
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'})
      res.end(`Cannot ${objUrl.pathname} ${req.method}`)
    };

  
});

server.listen(3000, () => console.log('Server has been started at http://localhost:3000'))
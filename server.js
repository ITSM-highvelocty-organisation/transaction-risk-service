import http from 'node:http';

const port = process.env.PORT || 3002;
http.createServer((_request, response) => {
  response.writeHead(200, {'content-type': 'application/json'});
  response.end(JSON.stringify({status: 'UP', service: 'transaction-risk-service'}));
}).listen(port);

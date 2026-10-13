import http from 'node:http';

const port = process.env.PORT || 3002;
const ruleVersion = process.env.RISK_RULE_VERSION || 'wallet-risk-v3';
http.createServer((_request, response) => {
  response.writeHead(200, {'content-type': 'application/json'});
  response.end(JSON.stringify({status: 'UP', service: 'transaction-risk-service', ruleVersion, uptimeSeconds: Math.floor(process.uptime())}));
}).listen(port);

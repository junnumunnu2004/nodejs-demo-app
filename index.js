const http = require('http');

const PORT = process.env.PORT || 3000;

const requestListener = (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from nodejs-demo-app');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  timeout: 3000,
};

const req = http.request(options, (res) => {
  const { statusCode } = res;
  let rawData = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    if (statusCode === 200) {
      console.log('Smoke test passed with status 200');
      process.exit(0);
    } else {
      console.error(`Unexpected status code: ${statusCode}`);
      console.error(`Body: ${rawData}`);
      process.exit(1);
    }
  });
});

req.on('timeout', () => {
  console.error('Request timed out');
  req.destroy();
  process.exit(1);
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
  process.exit(1);
});

req.end();


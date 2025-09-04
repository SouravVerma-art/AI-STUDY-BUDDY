const http = require('http');

// Test the health endpoint
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/health',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('✅ Health check successful!');
    console.log('Response:', JSON.parse(data));
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.end();

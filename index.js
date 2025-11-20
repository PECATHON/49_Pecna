const http = require('http');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
    // 1. Generate a random code
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();

    // 2. Send the response to the browser
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Your Random Code: ${code}</h1>`);
});

// This is crucial: Vercel assigns a specific port, we must use it.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

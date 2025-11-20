const crypto = require('crypto');

// On Vercel, we export a function instead of starting a server
module.exports = (req, res) => {
    // 1. Generate the random code
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    const formatted = `${code.slice(0,4)}-${code.slice(4,8)}`;

    // 2. Send the response
    // 200 means "OK"
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>Your Random Code</h1>
            <h2 style="font-size: 3em; color: #0070f3;">${formatted}</h2>
            <p>Refresh for a new code</p>
        </div>
    `);
};

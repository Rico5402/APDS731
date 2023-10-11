// Import the HTTPS module
const https = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000;

// Create HTTPS server
const server = https.createServer(
    { 
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    },
    app
);
    
server.listen(port, () => {
    console.log(`Server is running securely on HTTPS protocol at port ${port}`);
});

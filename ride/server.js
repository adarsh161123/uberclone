const http = require('http');
const app = require('./app');   

// const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(3003, () => {
    console.log(`ride Server is running on port 3003`);
});
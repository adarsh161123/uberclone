const http = require('http');
const app = require('./app');   

// const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});
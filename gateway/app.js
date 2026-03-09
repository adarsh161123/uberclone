const express = require('express');
const expreeproxy = require('express-http-proxy');
const app = express();
app.use('/users', expreeproxy('http://localhost:3001'));
app.use('/captains', expreeproxy('http://localhost:3002'));
app.use('/rides', expreeproxy('http://localhost:3003'));


app.listen(3000, () => {
    console.log('Gateway server is running on port 3000');
}
);
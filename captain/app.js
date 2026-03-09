const express = require('express');
const captainroutes = require('./routes/captain.route');   
const dotenv = require('dotenv');
const db = require('./db'); 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
dotenv.config();  
const cookieParser = require('cookie-parser');  
const app = express();

app.use(express.json());
app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use('/', captainroutes);

module.exports = app;
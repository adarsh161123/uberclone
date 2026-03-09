const monogoose = require('mongoose');

require('dotenv').config();

// const monogourl = 'mongodb://localhost:27017/hotels';
// const monogourl = process.env.MONGODB_URI_LOCAL;
const monogourl = process.env.MONGODB_URI;

monogoose.connect(monogourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

const db = monogoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Captain Connected to MongoDB');
});

module.exports = db; 




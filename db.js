const mongoose = require('mongoose');

// setting URL
const mongoURL = 'mongodb://0.0.0.0:27017/hotels';

//setup connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//default connection, object to handle all things with server.
const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected with MONGODB DATABASE SERVER');
});
db.on('disconnected',()=>{
    console.log('DISconnected with MONGODB DATABASE SERVER');
});
db.on('error',(err)=>{
    console.log('Error while connecting to MONGODB DATABASE SERVER',err);
});

//export
module.exports = db;
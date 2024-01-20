const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());



// app.get('/', function (req, res) {
//   res.send('How may I help You?')
// })
// app.get('/idli', function (req, res) {
//     res.send('Idli will be server.')
// })
// app.get('/chicken',(req,res)=>{
//     res.send("Chicken will be Served");
// })

const personRoutes = require('./routes/personRoute');
app.use('/person',personRoutes);


app.listen(3000,()=>{
    console.log("Server is running at PORT.")
})
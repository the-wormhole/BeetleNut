const port = process.env.PORT || 8000;
const express = require('express');

const db = require('./config/mongoose');

const app = express();
const router = require('./routes/index');

app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',router);

app.listen(port,(err)=>{
    if(err){
        console.log("Error!!!!")
    }
    console.log("Server up!!!");
    console.log("Port:",port);
});
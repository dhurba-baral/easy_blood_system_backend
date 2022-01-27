const express = require('express');
const bodyParser=require('body-parser');
const requestRouter=require('./request/request');
const createdbRouter=require('./create/createdb');
const createtableRouter=require('./create/createtable');
require('dotenv').config();

const app = express();


// accept url encoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// accept json 
app.use(bodyParser.json());

app.use(requestRouter)
app.use(createdbRouter)
app.use(createtableRouter)


app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
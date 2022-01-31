const express = require('express');
const bodyParser=require('body-parser');
const requestRouter=require('./request/request');
const donorRouter=require('./donor/donor');
const adminRouter=require('./admin/admin');
const createdbRouter=require('./create/createdb');
const createtableRouter=require('./create/createtable');


const app = express();


// accept url encoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// accept json 
app.use(bodyParser.json());

app.use(requestRouter)
app.use(donorRouter)
app.use(adminRouter)
app.use(createdbRouter)
app.use(createtableRouter)


app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
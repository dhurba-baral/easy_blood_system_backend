const express = require('express');
const userRouter=require('./api/request/request.router');
require('dotenv').config();

const app = express();

app.use(userRouter);


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(process.env.PORT,()=>{
    console.log('server is running on port 4000')
})
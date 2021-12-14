const express=require('express')
var cors = require('cors')
const requestRouter=require('./routers/request')
const offerRouter=require('./routers/offer')
const userRouter=require('./routers/user')
require('./database/mongoose')


const app=express()
app.use(cors())



app.use(express.json())
app.use(requestRouter)
app.use(offerRouter)
app.use(userRouter)


app.listen(4000,()=>{
    console.log('The port is started in port 4000.')
})
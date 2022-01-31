const router=require('express').Router();
const mysql=require('mysql');
require('dotenv').config();

//create a connection
const db=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

//connect to database
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mysql connected');
});

router.get('/createdb',(req,res)=>{
    const sql='CREATE DATABASE blooddonation';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Database created....');
    });

});

module.exports=router;
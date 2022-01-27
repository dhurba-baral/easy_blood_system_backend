const router=require('express').Router();
const mysql=require('mysql');

//create a connection
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
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
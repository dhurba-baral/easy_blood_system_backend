const router=require('express').Router();
const mysql=require('mysql');

//create a connection
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'blooddonation'
});

//connect to database
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mysql connected');
});

//to create table
router.get('/createtable',(req,res)=>{
    const sql='CREATE TABLE request(id int NOT NULL AUTO_INCREMENT,name VARCHAR(255),address VARCHAR(255),contact VARCHAR(255),email VARCHAR(255),bloodGroup VARCHAR(255),description VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Table created....');
    });
});

module.exports=router;
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

//to create table request
router.get('/createtable/request',(req,res)=>{
    const sql='CREATE TABLE request(id int NOT NULL AUTO_INCREMENT,name VARCHAR(255),address VARCHAR(255),contact VARCHAR(255),email VARCHAR(255),bloodGroup VARCHAR(255),description VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Request table created....');
    });
});

//to create table donor
router.get('/createtable/donor',(req,res)=>{
    const sql='CREATE TABLE donor(id int NOT NULL AUTO_INCREMENT,name VARCHAR(255),address VARCHAR(255),contact VARCHAR(255),email VARCHAR(255),bloodGroup VARCHAR(255),description VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Donor table created....');
    });
});

//to create table admin
router.get('/createtable/admin',(req,res)=>{
    const sql='CREATE TABLE admin(id int NOT NULL AUTO_INCREMENT,name VARCHAR(255),email VARCHAR(255),password VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Admin table created....');
    });
})

module.exports=router;
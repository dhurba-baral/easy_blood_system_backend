const express = require('express');
const mysql = require('mysql');
const bodyParser=require('body-parser');
const requestRouter=require('./request/request');
require('dotenv').config();

const app = express();


// accept url encoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// accept json 
app.use(bodyParser.json());

app.use(requestRouter)


// const db=mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS
// });


// //to create database
// db.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     console.log('Connection established');
//     db.query('CREATE DATABASE IF NOT EXISTS bloodDonation',(err,result)=>{
//         if(err){
//             throw err;
//         }
//         console.log('Database created');
//     }
//     )
// });

// //to create table
// const dbTable=mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: 'bloodDonation'
// });

// dbTable.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     console.log('Connection established');
//     const sql='CREATE TABLE IF NOT EXISTS request(name VARCHAR(255),address VARCHAR(255),contact INT,email VARCHAR(255),bloodGroup VARCHAR(255),description VARCHAR(255))';
//     dbTable.query(sql,(err,result)=>{
//         if(err){
//             throw err;
//         }
//         console.log('Table created');
//     })
// });


app.listen(process.env.PORT,()=>{
    console.log('server is running on port 3000')
})
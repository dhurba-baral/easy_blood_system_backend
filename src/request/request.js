const router=require('express').Router();
const mysql=require('mysql');
const auth=require('../authentication/auth');
require('dotenv').config();

//create a connection
const db=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME
});

//connect to database
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mysql connected');
});

//create a request
router.post('/request',(req,res)=>{
    const sql="INSERT INTO request (name,address,contact,email,bloodGroup,description) VALUES (?,?,?,?,?,?)";
    db.query(sql,
        [
            req.body.name,
            req.body.address,
            req.body.contact,
            req.body.email,
            req.body.bloodGroup,
            req.body.description
        ],
        (err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});


//get all requests
router.get('/request',(req,res)=>{
    const sql="SELECT * FROM request";
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});

//get a request by id
router.get('/request/:id',(req,res)=>{
    const sql="SELECT * FROM request WHERE id=?";
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result[0]);
    })
});

//update a request by id
router.put('/request/:id',(req,res)=>{
    const sql="UPDATE request SET name=?,address=?,contact=?,email=?,bloodGroup=?,description=? WHERE id=?";
    db.query(sql,[
        req.body.name,
        req.body.address,
        req.body.contact,
        req.body.email,
        req.body.bloodGroup,
        req.body.description,
        req.params.id
    ],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});

//delete a request by id
router.delete('/request/:id',auth,(req,res)=>{
    const sql="DELETE FROM request WHERE id=?";
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});

module.exports=router;
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

//create a donor
router.post('/donor',(req,res)=>{
    const sql="INSERT INTO donor (name,address,contact,email,bloodGroup,description) VALUES (?,?,?,?,?,?)";
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


//get all donors
router.get('/donor',(req,res)=>{
    const sql="SELECT * FROM donor";
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});

//get a donor by id
router.get('/donor/:id',(req,res)=>{
    const sql="SELECT * FROM donor WHERE id=?";
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result[0]);
    })
});

//search donor by blood group
router.get('/donorsearch',(req,res)=>{
    const sql=`SELECT * FROM donor WHERE bloodGroup LIKE '%${req.query.bloodGroup}%'`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    }
    )
});



//update a donor by id
router.put('/donor/:id',(req,res)=>{
    const sql="UPDATE donor SET name=?,address=?,contact=?,email=?,bloodGroup=?,description=? WHERE id=?";
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

//delete a donor by id
router.delete('/donor/:id',auth,(req,res)=>{
    const sql="DELETE FROM donor WHERE id=?";
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});

module.exports=router;
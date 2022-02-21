const router=require('express').Router();
const mysql=require('mysql');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
// const auth=require('../authentication/auth')
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

//create an admin
router.post('/admin',(req,res)=>{
    const sql="INSERT INTO admin (name,email,password) VALUES (?,?,?)";
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    db.query(sql,
        [
            req.body.name,
            req.body.email,
            req.body.password
        ],
        (err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});

//get all admins
router.get('/admin',(req,res)=>{
    const sql="SELECT * FROM admin";
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});

router.post('/admin/login',(req,res)=>{
    const sql="SELECT * FROM admin WHERE email=?";
    db.query(sql,
            req.body.email,
        (err,result)=>{
        if(err){
            res.status(500).send(err);
        }else if(result.length===0){
            res.status(404).send({message:'invalid email or password'});
        }else{
        const isMatch = bcrypt.compareSync(req.body.password, result[0].password);
        if(isMatch){
            const token = jwt.sign({id:result[0].id},process.env.JWT_SECRET);
            res.status(200).send({result,token});
        }else{
            res.status(404).send({message:'invalid email or password'});
        }
        }
    })
});

//logout admin
// router.post('/admin/logout',auth,(req,res)=>{
//     try{
//         req.token='';
//         res.status(200).send({message:'Admin successfully logged out.'})
//     }catch(e){
//         res.status(500).send(e)
//     }
// })


module.exports=router;
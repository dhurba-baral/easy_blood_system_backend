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

//create an admin
router.post('/admin',(req,res)=>{
    const sql="INSERT INTO admin (name,email,password) VALUES (?,?,?)";
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

module.exports=router;
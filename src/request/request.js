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

module.exports=router;
const router=require('express').Router();
const mysql=require('mysql');

const db=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'bloodDonation'
});

//create a request
router.post('/create',(req,res)=>{
    const sql="INSERT INTO request (name,address,contact,email,bloodGroup,description) VALUES (?,?,?,?,?,?)";
    db.query(sql,
        req.body,
        (err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
});

module.exports=router;
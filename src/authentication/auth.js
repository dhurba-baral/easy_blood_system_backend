const jwt=require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token= req.header('Authorization').split(' ')[1];
        if(token){
            jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    res.status(401).send({message:'Invalid token'})
                }else{
                    next()
                }
            });
        }else{
            res.status(401).send({message:'Please, authenticate'})
        }
    }catch(e){
        res.status(401).send({ error: 'Please authenticate!' });
    }
}

module.exports = auth;
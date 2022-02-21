const jwt=require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token= req.header('Authorization').split(' ')[1];
        if(!token){
            res.status(401).send({message:'Please, authenticate'})
        }else{
            const decoded= jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.token= token;
            next();
        }
    }catch(e){
        res.status(401).send({ error: 'Please authenticate!' });
    }
}

module.exports = auth;
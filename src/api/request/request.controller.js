const {create}= require('./request.service') 

module.exports={
    createUser:(req,res)=>{
        const body=req.body;
        create(body,(error,results)=>{
            if(error){
                console.log(error)
                return res.status(500).send({
                    message:"Database connection error"
                })
            }
            return res.status(200).send(results)
        })
    }
}

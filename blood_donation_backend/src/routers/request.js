const express=require('express');
const router= new express.Router();
const helpRequest=require('../models/requests')
const authoriseIt = require('../authentication/auth');

router.post('/request',async (req, res)=>{
    const helpReq=new helpRequest(req.body)
    
      try{
          await helpReq.save();
          res.status(201).send(helpReq);
      }catch(e){
          res.status(400).send(e);
      }
})

router.get('/request/data/:id',async(req,res)=>{
    try{
        const requestData=await helpRequest.findById(req.params.id)
        res.status(200).send(requestData)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/request/data',async (req,res)=>{
    const regexs=req.query.fieldInput
    try{
    if (regexs){
      helpRequest.find({$or : [{category:{$regex:regexs,$options:'$i'}},{name:{$regex:regexs,$options:'$i'}}]}).then((data)=>{
          res.status(200).send(data)
      })
    }else{
        
            const getRequestAll=await helpRequest.find({})
            res.status(200).send(getRequestAll)
    }
}catch(e){
    res.status(400).send(e)
}
})

//to update the request by id
// router.patch('/request/:id', authoriseIt, async (req, res) => {
//     try {
//       const requestData = await helpRequest.findByIdAndUpdate({
//         _id: req.params.id
//       }, req.body);
//       if (!requestData) {
//         return res.send({
//           errorMessage: 'Request not found.',
//         });
//       }
//       res.send(requestData);
//     } catch (e) {
//       res.send(e);
//     }
//   });

//to update the request by id
router.patch('/request/:id', authoriseIt,async (req, res) => {
    await helpRequest.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((request) => {
        if (!request) {
            return res.status(404).send();
        }
        res.send(request);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//to delete request by id
router.delete('/request/:id', authoriseIt, async (req, res) => {
    try {
      const deleteRequest = await helpRequest.findOneAndDelete({
        _id: req.params.id
      });
      if (!deleteRequest) {
        return res.send({
          errorMessage: 'Content not found.',
        });
      }
      res.send(deleteRequest);
    } catch (e) {
      res.send(e);
    }
  });


module.exports=router;
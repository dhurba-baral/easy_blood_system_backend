const express = require('express');
const router=new express.Router();
const helpOffer=require('../models/offer')
const authoriseIt = require('../authentication/auth');

router.post('/offer',async (req,res)=>{
    const hlpOffer=new helpOffer(req.body);
    try{
        await hlpOffer.save();
        res.status(201).send(hlpOffer);
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/offer/data/:id',async(req,res)=>{
    try{
        const requestData=await helpOffer.findById(req.params.id)
        res.status(200).send(requestData)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/offer/data',async (req,res)=>{
    try{     
            const getOfferAll=await helpOffer.find({})
            res.status(200).send(getOfferAll)
}catch(e){
    res.status(400).send(e)
}
})

//to update the offer by id
// router.patch('/offer/:id', authoriseIt, async (req, res) => {
//     try {
//       const requestData = await helpOffer.findOneAndUpdate({
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

router.patch('/offer/:id',authoriseIt, async (req, res) => {
    await helpOffer.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((request) => {
        if (!request) {
            return res.status(404).send();
        }
        res.send(request);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//to delete offer by id
router.delete('/offer/:id', authoriseIt, async (req, res) => {
    try {
      const deleteOffer = await helpOffer.findOneAndDelete({
        _id: req.params.id
      });
      if (!deleteOffer) {
        return res.send({
          errorMessage: 'Content not found.',
        });
      }
      res.send(deleteOffer);
    } catch (e) {
      res.send(e);
    }
  });



module.exports=router;
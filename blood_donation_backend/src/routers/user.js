const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const bcrypt=require('bcryptjs');
const authoriseIt = require('../authentication/auth');

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body);
    try {
      //check email if it already exists
      const checkEmail = await User.findOne({ email: req.body.email });
      if (checkEmail) {
        return res.send({
          errorMessage: 'Email already exists.',
        });
      }
  
      //save user
      await user.save();
  
    //to generate the authentication token
      const token=await user.generateToken();

      //hide private data
      const publicProfile = user.toObject();
      delete publicProfile.password;
      delete publicProfile.tokens;

      res.status(201).send({publicProfile,token});
    } catch (e) {
      res.send(e);
    }
  });

router.post('/users/login', async (req, res) => {
    //console.log(req.body)
    try {
      //find the  user by email
      const findUserByEmail = await User.findOne({ email: req.body.email });
      //console.log(findUserByEmail)
      if (!findUserByEmail) {
        res.send({
          errorMessage: 'Email is not registered',
        });
      } else {
        //compare the password provided with the hashed password in db
        const compared = await bcrypt.compare(
          req.body.password,
          findUserByEmail.password
        );
        if (!compared) {
          res.send({
            errorMessage: 'Password is incorrect!',
          });
        } else {
          //generate authentication token
         const token = await findUserByEmail.generateToken();
  
          //hide private data
          const publicProfile = findUserByEmail.toObject();
          delete publicProfile.password;
          delete publicProfile.tokens;
  
          res.send({publicProfile,token});
        }
      }
    } catch (e) {
      res.send(e);
    }
  });

router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const publicProfile = user.toObject();
      //hide private data
      delete publicProfile.password;
    //   delete publicProfile.tokens;
  
      //send response
      res.send(publicProfile);
    } catch (e) {
      res.send(e);
    }
  });

  //to logout user
router.post('/users/logout',authoriseIt,async(req,res)=>{
    try{
    const user=req.user
    const token=req.token
    //find the authenticated token
    const findObjectOfToken=user.tokens.find((tokenObject)=>{
        return tokenObject.token==token
      })
    //find the index in array where the authenticated token is located
    const index=user.tokens.indexOf(findObjectOfToken)
    //romove the authenticated token (replace 1 element at index-'index')
    if(index>-1){
      user.tokens.splice(index,1)
    }
    await user.save()
    res.send()
    }catch(e){
      res.send(e)
    }
  })





module.exports=router;
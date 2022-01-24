const {createUser}=require('./request.controller');
const express = require('express');
const router = new express.Router();

router.post('./request',createUser)

module.exports=router
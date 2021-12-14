const mongoose=require('mongoose');
const validator=require('validator');

const helpRequestSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        lowercase:true,
        validate(email){
            const checkEmail=validator.isEmail(email)
            if(checkEmail == false){
                throw new Error('Email is invalid!');
            }
        },
    },
    name:{
        type:String,
        trim:true,
        required:true,
        minLength:3
    },
    contactNumber:{
        type:Number,
        trim:true,
        required:true,
        minLength:5,
        maxLength:15
    },
    category:{
        type:String,
        trim:true,
        required:true,
    },
    details:{
        type:String,
        trim:true,
        minLength:10
    }
})

const helpRequest=mongoose.model('helpRequest',helpRequestSchema)

module.exports=helpRequest;
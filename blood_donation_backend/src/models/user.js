const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
//User Schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate(email) {
        const checkForEmail = validator.isEmail(email);
        if (checkForEmail == false) {
          throw new Error('Email is invalid!');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ]
});

//to hash password
//Defines a pre hook for the model
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      //if the password is modified(created or updated), the plain text password is overwritten by the hashed
      this.password = await bcrypt.hash(this.password, 8)
   }
    next();
});

//schema method to generate authentication token
userSchema.methods.generateToken = async function () {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      'softwareProject'
    );
    this.tokens.push({ token });
    this.save();
    return token
  };
  

//User model
const User = mongoose.model('User', userSchema);

module.exports = User;
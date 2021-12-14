const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authoriseIt = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1]; //access the token from request header
    const verified = jwt.verify(token, 'softwareProject'); //verify it using secret key
    const user = await User.findOne({    //find the user by the token
      _id: verified._id,
      'tokens.token': token,
    });
    if (!user) {
      return res.send({
        errorMessage: 'User is not authenticated!',
      });
    }
    req.user = user;  //authenticated user
    req.token=token;  //authenticated token
    next();
  } catch (e) {
    res.status(401).send({ errorMessage: 'Authentication failed!' });
  }
};
module.exports = authoriseIt;
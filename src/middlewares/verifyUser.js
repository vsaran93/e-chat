const jwt = require("jsonwebtoken");
const config = require("../../config/vars");
const User = require('../models/user.model');


const verifyUser = async (token) => {
  const decoded = jwt.verify(token, config.secret);
  if (decoded) {
    const userId = decoded.user.id;
    const registeredUser = await User.findOne({ _id: userId });
    if (registeredUser) {
      return { auth: true, user: registeredUser, msg: "registered user" };
    }
    return { auth: false, msg: "user not registered " };
  }
  return { auth: false, msg: "invalid token" };
};


module.exports =  verifyUser;
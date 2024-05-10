const JWT = require('jsonwebtoken')
const userModel = require('../models/userModel')

// USER AUTH
const isAuth = async (req, res, next) => {
  // try {
  //   const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)

  //   req.user = decode
  //   next()
  //  } catch (error) {
  //   console.log(error)
  //  }
  const { token } = req.cookies;
  //valdiation
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized User",
    });
  }
  const decodeData = JWT.verify(token,req.headers.authorization, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodeData._id);
  next();
};

module.exports = {
    isAuth
}
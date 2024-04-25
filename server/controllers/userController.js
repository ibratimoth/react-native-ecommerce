const validator = require('validator')
const userModel = require("../models/userModel");
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary')
const {getDataUri} = require("../utils/features.js")
const dotenv = require('dotenv')
dotenv.config()

const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone, answer } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !city ||
      !address ||
      !country ||
      !phone ||
      !answer
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    if(!validator.isEmail(email)){
        return res.send({
            message: 'Email is not valid'
        })
    }

    //password validation criteria
   const minLength = 6
   const hasUpperCase = true
   const hasLowerCase = true
   const hasNumber = true
   const hasSpecialCharacter = true

   //password validation
   const isValidPassword = validator.isStrongPassword(password, {
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers: hasNumber,
    hasSymbols: hasSpecialCharacter
   })

   if(!isValidPassword){
    return res.send({
        message: 'Password is not strong include uppercase, lowercase and characters'
    })
   }
    //check exisiting user
    const existingUSer = await userModel.findOne({ email });
    //validation
    if (existingUSer) {
      return res.status(500).send({
        success: false,
        message: "email already taken",
      });
    }

    const user = await userModel.create({
        name,
        email,
        password,
        address,
        city,
        country,
        phone,
        answer,
      });
      res.status(201).send({
        success: true,
        message: "Registeration Success, please login",
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
          return res.status(500).send({
            success: false,
            message: "Please Add Email OR Password",
          });
        }
        // check user
        const user = await userModel.findOne({ email });
        //user valdiation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "User Not Found",
          });
        }
        //check pass
        const isMatch = await user.comparePassword(password);
        //valdiation pass
        if (!isMatch) {
          return res.status(500).send({
            success: false,
            message: "invalid credentials",
          });
        }

          //token
    const token = user.generateToken();
    
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            secure: process.env.DEV_MODE === "development" ? true : false,
            httpOnly: process.env.DEV_MODE === "development" ? true : false,
            sameSite: process.env.DEV_MODE === "development" ? true : false,
          }).send({
            success: true,
            message: 'login successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: "false",
          message: "Error In Login Api",
          error,
        });
    }
}

const getUserProfileController = async (req, res) => {
  try {

    const user = await userModel.findById(req.user._id);

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "USer Prfolie Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In PRofile API",
      error,
    });
  }
}

const logoutController = async (req, res) => {
  try {
    
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      secure: process.env.DEV_MODE === "development" ? true : false,
      httpOnly: process.env.DEV_MODE === "development" ? true : false,
      sameSite: process.env.DEV_MODE === "development" ? true : false,
    })
    .send({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Logout API",
      error,
    });
  }
}

const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, address, city, country, phone } = req.body;
    // validation + Update
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Profile Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update profile API",
      error,
    });
  }
}

const udpatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    //valdiation
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new password",
      });
    }
    // old pass check
    const isMatch = await user.comparePassword(oldPassword);
    //validaytion
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update password API",
      error,
    });
  }
}
const updateProfilePicController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    // file get from client photo
    const file = getDataUri(req.file);
    // delete prev image
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    // update
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    // save func
    await user.save();

    res.status(200).send({
      success: true,
      message: "profile picture updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update profile pic API",
      error,
    });
  }
}
module.exports = {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updateProfileController,
  udpatePasswordController,
  updateProfilePicController 
};

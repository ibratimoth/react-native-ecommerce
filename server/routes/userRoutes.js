const express = require("express");
const {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updateProfileController,
  udpatePasswordController,
  updateProfilePicController,
} = require("../controllers/userController");
const { isAuth } = require("../middlewares/authMiddleware");
const { singleUpload } = require("../middlewares/multer");

//router object
const router = express.Router();

//routes
// register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//profile
router.get("/profile", isAuth, getUserProfileController);

//logout
router.get("/logout", isAuth, logoutController);

// uopdate profile
router.put("/profile-update", isAuth, updateProfileController);

// updte password
router.put("/update-password", isAuth, udpatePasswordController);

// update profile pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);

module.exports = router;

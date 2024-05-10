const express = require("express");
const {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updateProfileController,
  udpatePasswordController,
  updateProfilePicController,
  passwordResetController,
} = require("../controllers/userController");
const { isAuth } = require("../middlewares/authMiddleware");
const { singleUpload } = require("../middlewares/multer");
const { rateLimit } = require('express-rate-limit')

// RATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

//router object
const router = express.Router();

//routes
// register
router.post("/register", limiter, registerController);

//login
router.post("/login", loginController);

//profile
router.get("/profile", isAuth, getUserProfileController);

//logout
router.get("/logout",isAuth, logoutController);

// uopdate profile
router.put("/profile-update", isAuth, updateProfileController);

// updte password
router.put("/update-password", isAuth, udpatePasswordController);

// update profile pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);

// FORGOT PASSWORD
router.post("/reset-password", passwordResetController);

module.exports = router;

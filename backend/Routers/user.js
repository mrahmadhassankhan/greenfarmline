const express = require("express");
const { UploadingFileMiddleware } = require("../middlewares/ImageMiddleware");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const {
  register,
  login,
  verifyUser,
  getOrder,
  forgetPassword,
  getUserProfile,
  updateUserProfile,
} = require("../Controllers/user");

router.route("/register").post(UploadingFileMiddleware, register);
router.route("/login").post(login);
router.route("/verify").get(verifyUser);
router.route("/orders").get(getOrder);
router.route("/forgetpassword/:email").get(forgetPassword);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, updateUserProfile);

module.exports = router;

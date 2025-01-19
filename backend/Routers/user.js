const express = require("express");
const { UploadingFileMiddleware } = require("../middlewares/ImageMiddleware");
const router = express.Router();
const {
  register,
  login,
  verifyUser,
  getOrder,
  forgetPassword,
} = require("../Controllers/user");

router.route("/register").post(UploadingFileMiddleware, register);
router.route("/login").post(login);
router.route("/verify").get(verifyUser);
router.route("/orders").get(getOrder);
router.route("/forgetpassword/:email").get(forgetPassword);

module.exports = router;

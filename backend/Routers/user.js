const express = require("express");
const { UploadingFileMiddleware } = require("../middlewares/ImageMiddleware");
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
const roleMiddleware = require("../middlewares/role");
const authMiddleware = require("../middlewares/auth");
router.use(authMiddleware);
router.route("/register").post(UploadingFileMiddleware, register);
router.route("/login").post(login);
router.route("/verify").get(roleMiddleware(["farmer"]), verifyUser);
router.route("/orders").get(roleMiddleware(["farmer"]), getOrder);
router
  .route("/forgetpassword/:email")
  .get(roleMiddleware(["farmer", "seller", "expert"]), forgetPassword);
router.route("/profile").get(authMiddleware, getUserProfile);
router.route("/profile/update").put(authMiddleware, updateUserProfile);

module.exports = router;

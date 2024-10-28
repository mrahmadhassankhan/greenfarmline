const express = require("express");
const registerRouter = express.Router();
const { multer } = require("../middlewares/ImageMiddleware");
const upload = multer();
const {
  FarmerRegisterController,
} = require("../Controllers/User/FarmerController");
const {
  SellerRegisterController,
} = require("../Controllers/User/SellerController");
const {
  ExpertRegisterController,
} = require("../Controllers/User/ExpertController");
const {
  buisnessLogouploadmiddleware,
  degreeuploadmiddleware,
} = require("../middlewares/ImageMiddleware");

//Registeration Routes
registerRouter
  .route("/registerAsFarmer")
  .post(upload.none(), FarmerRegisterController);
registerRouter
  .route("/registerAsSeller")
  .post(buisnessLogouploadmiddleware, SellerRegisterController);
registerRouter
  .route("/registerAsExpert")
  .post(degreeuploadmiddleware, ExpertRegisterController);

module.exports = registerRouter;

const express = require("express");
const registerRouter = express.Router();
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
registerRouter.route("/registerAsFarmer").post(FarmerRegisterController);
registerRouter
  .route("/registerAsSeller")
  .post(buisnessLogouploadmiddleware, SellerRegisterController);
registerRouter
  .route("/registerAsExpert")
  .post(degreeuploadmiddleware, ExpertRegisterController);

module.exports = registerRouter;

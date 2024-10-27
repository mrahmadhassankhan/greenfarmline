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

//Registeration Routes
registerRouter.route("/registerAsFarmer").post(FarmerRegisterController);
registerRouter.route("/registerAsSeller").post(SellerRegisterController);
registerRouter.route("/registerAsExpert").post(ExpertRegisterController);

module.exports = registerRouter;

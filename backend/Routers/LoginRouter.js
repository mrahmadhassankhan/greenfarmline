const express = require("express");
const {
  FarmerLoginController,
} = require("../Controllers/User/FarmerController");
const {
  SellerLoginController,
} = require("../Controllers/User/SellerController");
const {
  ExpertLoginController,
} = require("../Controllers/User/ExpertController");
const loginRouter = express.Router();

loginRouter.route("/loginAsFarmer").post(FarmerLoginController);
loginRouter.route("/loginAsSeller").post(SellerLoginController);
loginRouter.route("/loginAsExpert").post(ExpertLoginController);

module.exports = loginRouter;

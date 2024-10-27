const AsyncHandler = require("express-async-handler");
const SellerModel = require("../../Models/User/SellerModel");
const SellerRegisterController = AsyncHandler(async (req, res) => {
  console.log(req.body);
});

module.exports = { SellerRegisterController };

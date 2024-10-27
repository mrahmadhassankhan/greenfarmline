const AsyncHandler = require("express-async-handler");
const FarmerModel = require("../../Models/User/FarmerModel");
const FarmerRegisterController = AsyncHandler(async (req, res) => {
  console.log(req.body);
});

module.exports = { FarmerRegisterController };

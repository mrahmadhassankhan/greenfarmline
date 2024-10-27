const AsyncHandler = require("express-async-handler");
const ExpertModel = require("../../Models/User/ExpertModel");
const ExpertRegisterController = AsyncHandler(async (req, res) => {
  console.log(req.body);
});

module.exports = { ExpertRegisterController };

const express = require("express");
const contactUsRouter = express.Router();
const {
  postcontactus,
  getcontactus,
  deletecontactus,
} = require("../Controllers/Admin/ContactUsController");

//ContactUs Routes
contactUsRouter.route("/postcontactus").post(postcontactus);
contactUsRouter.route("/getcontactus").get(getcontactus);
contactUsRouter.route("/deletecontactus/:queryId").delete(deletecontactus);

module.exports = contactUsRouter;

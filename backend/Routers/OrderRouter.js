const express = require("express");
const orderRouter = express.Router();
const {
  postorder,
  getorder,
  deleteorder,
} = require("../Controllers/Admin/OrderController");

//Orders Routes
orderRouter.route("/postorder").post(postorder);
orderRouter.route("/getorder").get(getorder);
orderRouter.route("/deleteorder/:orderId").delete(deleteorder);

module.exports = orderRouter;

const express = require("express");
const { checkout } = require("../Controllers/payments");
const router = express.Router();

router.route("/create-checkout-session").post(checkout);

module.exports = router;

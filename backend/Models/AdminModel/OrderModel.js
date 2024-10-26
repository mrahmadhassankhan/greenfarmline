const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: false },
    city: { type: String, required: true },
    country: { type: String, required: true ,unique: false },
    address: { type: String, required: true },
    productname: { type: String, required: true,unique:false },
    description: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true }
});

const OrderModel = mongoose.model("Orders", orderSchema);

module.exports = OrderModel;

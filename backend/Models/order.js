const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentIntentId: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        isReviewed: { type: Boolean, default: false },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: {
      address: {
        city: String,
        country: String,
        line1: String,
        line2: String,
        postal_code: String,
        state: String,
      },
      email: { type: String, required: true },
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

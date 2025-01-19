const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "Please provide a SKU"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[a-z0-9-]+$/.test(value); // Allow alphanumeric and hyphens only
        },
        message:
          "SKU must contain only lowercase letters, numbers, and hyphens",
      },
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },

    slug: {
      type: String,
      slug: ["name", "sku"],
      slug_padding_size: 4,
      default: function () {
        return `${this.name || "product"}-${this.sku || "sku"}`;
      },
    },

    brand: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand"],
    },
    category: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Please provide a category"], // Categories like seeds, fertilizers, etc.
    },
    document: {
      type: String,
      trim: true,
      required: [true, "Please provide an image"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a description"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide a quantity"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },

    ratings: [
      {
        name: {
          type: String,
          default: "Anonymous",
        },
        rating: {
          type: Number,
        },
        review: {
          type: String,
          trim: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ratingScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

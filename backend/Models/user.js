const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: ["Please provide an email"],
      unique: true,
      validate: {
        validator: function (v) {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})$/;
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: ["Please provide a password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["farmer", "seller", "expert", "admin"],
      required: ["Please specify the role"],
    },
    phoneNumber: { type: String },
    address: { type: String },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
          },
        },
      ],
      totalPrice: {
        type: Number,
        default: 0,
      },
    },

    businessName: { type: String },
    registrationNo: { type: String },
    document: { type: String },

    qualification: { type: String },
    yearsOfExperience: { type: Number },
    expertise: { type: String },
  },
  { timestamps: true } //
);

// Add role-based validation
userSchema.pre("save", function (next) {
  const requiredFieldsByRole = {
    farmer: ["phoneNumber", "address"],
    seller: ["businessName", "registrationNo", "document", "phoneNumber"],
    expert: [
      "qualification",
      "document",
      "yearsOfExperience",
      "expertise",
      "phoneNumber",
    ],
  };

  const role = this.role;
  const requiredFields = requiredFieldsByRole[role] || [];

  const missingFields = requiredFields.filter(
    (field) => !this[field] || this[field] === ""
  );

  if (missingFields.length > 0) {
    return next(
      new Error(
        `Missing required fields for ${role}: ${missingFields.join(", ")}`
      )
    );
  }
  next();
});

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

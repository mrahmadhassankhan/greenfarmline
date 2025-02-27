const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      index: true,
      validate: {
        validator: function (v) {
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["farmer", "seller", "expert", "admin"],
      required: [true, "Please specify the role"],
    },
    phoneNumber: { type: String },
    address: { type: String },
    cart: {
      items: {
        type: [
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
        default: [],
      },
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
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isNew) return next();

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

// Hash password before saving (Prevent double hashing)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password.startsWith("$2a$")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

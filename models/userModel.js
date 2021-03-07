const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const user_schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
  },
  email: {
    type: String,
    required: [true, "please provide your emal"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false,
  },
  password_confirm: {
    type: String,
    required: ["true", "please confirm your password"],
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

user_schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.password_confirm = undefined;
  next();
});

user_schema.methods.check_password = async function (
  input_password,
  user_password
) {
  return await bcrypt.compare(input_password, user_password);
};

const User = mongoose.model("User", user_schema);
module.exports = User;

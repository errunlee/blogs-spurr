const mongoose = require("mongoose");
const roles = require("../utils/roles");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.user],
    default: roles.user,
  },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;

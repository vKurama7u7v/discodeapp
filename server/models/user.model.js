const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  first_name: {
    type: String,
    require: true,
    trim: true,
  },
  last_name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  resetPasswordLink: {
    data: String,
    default: "",
  },
  role: {
    type: String,
    default: "Estudiante",
  },
  avatar: {
    type: String,
    trim: true,
  },
  siteWeb: {
    type: String,
    trim: true,
  },
  linkedinWeb: {
    type: String,
    trim: true,
  },
  githubWeb: {
    type: String,
    trim: true,
  },
  dribbbleWeb: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  is_superuser: {
    type: Boolean,
    default: false,
  },
  is_staff: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);

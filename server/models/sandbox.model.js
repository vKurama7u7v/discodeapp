const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SanboxSchema = Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    trim: true,
  },
  language: {
    type: String,
    trim: true,
  },
  content: {
    type: Schema.Types.Mixed,
  },
  name_language: {
    type: String,
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
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

module.exports = mongoose.model("Codesandbox", SanboxSchema);

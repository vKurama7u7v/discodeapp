const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicationSchema = Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  idCloud: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
    trim: true,
  },
  file: {
    type: String,
    trim: true,
    require: true,
  },
  typeFile: {
    type: String,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Publication", PublicationSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
  temario: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Cursos", CourseSchema);

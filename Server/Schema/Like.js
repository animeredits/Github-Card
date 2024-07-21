const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  liked: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);

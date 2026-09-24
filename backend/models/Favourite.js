const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  giftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gift",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Favourite", favouriteSchema);
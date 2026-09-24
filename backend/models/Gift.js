const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  giftName: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  occasion: {
    type: String,
    required: true
  },

  relationship: {
    type: String,
    required: true
  },

  ageGroup: {
    type: String,
    required: true
  },

  interests: {
    type: [String],
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Gift", giftSchema);
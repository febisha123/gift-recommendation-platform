const Review = require("../models/Review");

const addReview = async (req, res) => {
  try {
    const { giftId, rating, comment } = req.body;

    const review = await Review.create({
      userId: req.user.userId,
      giftId,
      rating,
      comment
    });

    res.status(201).json({
      message: "Review added successfully",
      review
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      giftId: req.params.giftId
    }).populate("userId", "name");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  addReview,
  getReviews
};
const express = require("express");

const {
  addReview,
  getReviews
} = require("../controllers/reviewController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addReview);

router.get("/:giftId", authMiddleware, getReviews);

module.exports = router;
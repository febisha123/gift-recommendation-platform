const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const {
  getGifts,
  addGift,
  getRecommendations,
  updateGift,
  deleteGift
} = require("../controllers/giftController");

const router = express.Router();
router.get("/", getGifts);
router.post("/", authMiddleware, adminMiddleware, addGift);
router.put("/:id", authMiddleware, adminMiddleware, updateGift);
router.delete("/:id", authMiddleware, adminMiddleware, deleteGift);
router.get("/recommendations", getRecommendations);

module.exports = router;
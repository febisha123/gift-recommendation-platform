const express = require("express");

const {
  addFavourite,
  getFavourites,
  deleteFavourite
} = require("../controllers/favouriteController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addFavourite);

router.get("/", authMiddleware, getFavourites);

router.delete("/:id", authMiddleware, deleteFavourite);

module.exports = router;
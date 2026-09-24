const Gift = require("../models/Gift");

// Get all gifts
const getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new gift
const addGift = async (req, res) => {
  try {
    const gift = await Gift.create(req.body);

    res.status(201).json({
      message: "Gift added successfully",
      gift
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get recommended gifts
const getRecommendations = async (req, res) => {
  try {
    const { occasion, relationship, ageGroup, interests, maxPrice } = req.query;

    const filter = {};

    if (occasion) filter.occasion = occasion;
    if (relationship) filter.relationship = relationship;
    if (ageGroup) filter.ageGroup = ageGroup;
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    if (interests) {
      const interestList = interests.split(",");
      filter.interests = { $in: interestList };
    }

    const gifts = await Gift.find(filter);

    res.json(gifts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Update a gift
const updateGift = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found"
      });
    }

    res.json({
      message: "Gift updated successfully",
      gift
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
// Delete a gift
const deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found"
      });
    }

    res.json({
      message: "Gift deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getGifts,
  addGift,
  getRecommendations,
  updateGift,
  deleteGift
};
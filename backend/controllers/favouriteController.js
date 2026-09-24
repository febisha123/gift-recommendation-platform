const Favourite = require("../models/Favourite");

// Add a gift to favourites
const addFavourite = async (req, res) => {
  try {
    const { giftId } = req.body;

    const favourite = await Favourite.create({
      userId: req.user.userId,
      giftId: giftId
    });

    res.status(201).json({
      message: "Gift added to favourites",
      favourite
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// Get user's favourites
const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find({
      userId: req.user.userId
    }).populate("giftId");

    res.json(favourites);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// Delete a favourite
const deleteFavourite = async (req, res) => {
  try {
    const favourite = await Favourite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!favourite) {
      return res.status(404).json({
        message: "Favourite not found"
      });
    }

    res.json({
      message: "Favourite removed successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  addFavourite,
  getFavourites,
  deleteFavourite
};
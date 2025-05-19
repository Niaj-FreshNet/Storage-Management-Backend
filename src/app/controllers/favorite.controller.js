import { FavoriteService } from "../services/favorite.service.js";

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await FavoriteService.getAllFavorites(userId);

    res.json({
      success: true,
      data: favorites,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import { ImageService } from "../services/image.service.js";

const uploadImage = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    const userId = req.user._id;
    const folderId = req.body.folderId || null;

    const image = await ImageService.createImage({
      userId,
      folderId,
      name: req.file.originalname,
      url: req.file.path, // multer-storage-cloudinary puts URL here
      publicId: req.file.filename, // public_id from multer-storage-cloudinary
    });

    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getImages = async (req, res) => {
  try {
    const userId = req.user._id;
    const folderId = req.query.folderId || null;

    const images = await ImageService.getUserImages(userId, folderId);
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getImageById = async (req, res) => {
  try {
    const userId = req.user._id;
    const imageId = req.params.id;

    const image = await ImageService.getImageById(imageId, userId);

    if (!image)
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });

    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const imageId = req.params.id;

    await ImageService.deleteImage(imageId, userId);

    res
      .status(200)
      .json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const imageId = req.params.id;

    const image = await ImageService.toggleFavorite(imageId, userId);

    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const renameImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const imageId = req.params.id;
    const { newName } = req.body;

    if (!newName)
      return res
        .status(400)
        .json({ success: false, message: "New name is required" });

    const image = await ImageService.renameImage(imageId, userId, newName);

    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const duplicateImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const imageId = req.params.id;

    const newImage = await ImageService.duplicateImage(imageId, userId);

    res.status(201).json({ success: true, data: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const shareImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const imageId = req.params.id;
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "userIds array is required" });

    const image = await ImageService.shareImage(imageId, userId, userIds);

    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const unshareImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const imageId = req.params.id;
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "userIds array is required" });

    const image = await ImageService.unshareImage(imageId, userId, userIds);

    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ImageController = {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
  toggleFavorite,
  renameImage,
  duplicateImage,
  shareImage,
  unshareImage,
};

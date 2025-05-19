import Image from "../models/image.model.js";
import cloudinary from "../config/cloudinary.config.js";

const createImage = async (data) => {
  const image = await Image.create(data);
  return image;
};

const getUserImages = async (userId, folderId = null) => {
  return await Image.find({ userId, folderId });
};

const getImageById = async (imageId, userId) => {
  return await Image.findOne({ _id: imageId, userId });
};

const deleteImage = async (imageId, userId) => {
  const image = await Image.findOne({ _id: imageId, userId });
  if (!image) throw new Error("Image not found or access denied");

  await cloudinary.uploader.destroy(image.publicId);

  await image.deleteOne();

  return true;
};

const toggleFavorite = async (imageId, userId) => {
  const image = await Image.findOne({ _id: imageId, userId });
  if (!image) throw new Error("Image not found or access denied");

  image.isFavorite = !image.isFavorite;
  await image.save();

  return image;
};

const renameImage = async (imageId, userId, newName) => {
  const image = await Image.findOne({ _id: imageId, userId });
  if (!image) throw new Error("Image not found or access denied");

  image.name = newName;
  await image.save();

  return image;
};

const duplicateImage = async (imageId, userId) => {
  const image = await Image.findOne({ _id: imageId, userId });
  if (!image) throw new Error("Image not found or access denied");

  // Duplicate on Cloudinary
  const result = await cloudinary.uploader.upload(image.url, {
    folder: "storage_images",
  });

  // Create new DB record with duplicated image info
  const newImage = await Image.create({
    userId,
    folderId: image.folderId,
    name: image.name + " (copy)",
    url: result.secure_url,
    publicId: result.public_id,
  });

  return newImage;
};

const shareImage = async (imageId, userId, userIds) => {
  const image = await Image.findOne({ _id: imageId, userId });
  if (!image) throw new Error("Image not found or access denied");

  image.sharedWith = Array.from(
    new Set([...image.sharedWith.map(String), ...userIds])
  );
  await image.save();

  return image;
};

const unshareImage = async (imageId, userId, userIds) => {
  const image = await Image.findOne({ _id: imageId, userId });
  if (!image) throw new Error("Image not found or access denied");

  image.sharedWith = image.sharedWith.filter(
    (id) => !userIds.includes(id.toString())
  );
  await image.save();

  return image;
};

export const ImageService = {
  createImage,
  getUserImages,
  getImageById,
  deleteImage,
  toggleFavorite,
  renameImage,
  duplicateImage,
  shareImage,
  unshareImage,
};

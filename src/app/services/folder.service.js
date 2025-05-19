import Folder from "../models/folder.model.js";

// Create a new folder
const createFolder = async ({ name, userId, parentFolder }) => {
  return await Folder.create({ name, userId, parentFolder });
};

// Get folders for a user (optionally by parent folder)
const getUserFolders = async (userId, parentFolder = null) => {
  return await Folder.find({ userId, parentFolder });
};

// Delete folder by ID
const deleteFolder = async (id) => {
  return await Folder.findByIdAndDelete(id);
};

// Toggle Favorite folder
const toggleFavorite = async (folderId, userId) => {
  const folder = await Folder.findOne({ _id: folderId, userId });
  if (!folder) return null;

  folder.isFavorite = !folder.isFavorite;
  await folder.save();
  return folder;
};

// Rename folder
const renameFolder = async (id, newName) => {
  return await Folder.findByIdAndUpdate(id, { name: newName }, { new: true });
};

// Duplicate folder
const duplicateFolder = async (id) => {
  const original = await Folder.findById(id);
  if (!original) return null;

  return await Folder.create({
    name: original.name + " Copy",
    userId: original.userId,
    parentFolder: original.parentFolder,
  });
};

// Share folder with users
const shareFolder = async (folderId, userIds) => {
  const folder = await Folder.findById(folderId);
  if (!folder) return null;

  folder.sharedWith = Array.from(new Set([...folder.sharedWith.map(String), ...userIds]));

  await folder.save();
  return folder;
};

export const FolderService = {
  createFolder,
  getUserFolders,
  deleteFolder,
  toggleFavorite,
  renameFolder,
  duplicateFolder,
  shareFolder,
};

import { FolderService } from "../services/folder.service.js";

const createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;
    const userId = req.user._id;

    const folder = await FolderService.createFolder({
      name,
      userId,
      parentFolder,
    });
    res.status(201).json({ success: true, data: folder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserFolders = async (req, res) => {
  try {
    const userId = req.user._id;
    const parentFolder = req.query.parent || null;

    const folders = await FolderService.getUserFolders(userId, parentFolder);
    res.status(200).json({ success: true, data: folders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    await FolderService.deleteFolder(id);
    res.status(200).json({ success: true, message: "Folder deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const folder = await FolderService.toggleFavorite(id, userId);
    if (!folder)
      return res
        .status(404)
        .json({ success: false, message: "Folder not found" });

    res
      .status(200)
      .json({
        success: true,
        data: folder,
        message: `Folder marked as ${
          folder.isFavorite ? "favorite" : "not favorite"
        }`,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const renameFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;

    const updated = await FolderService.renameFolder(id, newName);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Folder not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const duplicateFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const duplicate = await FolderService.duplicateFolder(id);
    if (!duplicate)
      return res
        .status(404)
        .json({ success: false, message: "Folder not found" });

    res.status(201).json({ success: true, data: duplicate });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const shareFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "userIds must be a non-empty array" });
    }

    const updatedFolder = await FolderService.shareFolder(id, userIds);

    if (!updatedFolder) {
      return res
        .status(404)
        .json({ success: false, message: "Folder not found" });
    }

    res.status(200).json({ success: true, data: updatedFolder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const FolderController = {
  createFolder,
  getUserFolders,
  deleteFolder,
  toggleFavorite,
  renameFolder,
  duplicateFolder,
  shareFolder,
};

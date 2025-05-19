import express from "express";
import { FolderController } from "../controllers/folder.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a folder
router.post("/", verifyToken, FolderController.createFolder);

// Get all user folders (optionally filter by parent folder)
router.get("/", verifyToken, FolderController.getUserFolders);

// Delete a folder by ID
router.delete("/:id", verifyToken, FolderController.deleteFolder);

// Toggle Favorite a folder by ID
router.patch("/:id/favorite", verifyToken, FolderController.toggleFavorite);

// Rename a folder by ID
router.patch("/:id/rename", verifyToken, FolderController.renameFolder);

// Duplicate a folder by ID
router.post("/:id/duplicate", verifyToken, FolderController.duplicateFolder);

// Share a folder with other users
router.post("/:id/share", verifyToken, FolderController.shareFolder);

export const FolderRoutes = router;

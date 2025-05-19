import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { ImageController } from "../controllers/image.controller.js";
import multerParser from "../middlewares/multer.middleware.js";

const router = express.Router();

// Upload image (form-data key: image)
router.post("/upload", verifyToken, multerParser.single("image"), ImageController.uploadImage);

// Get all images for user (optional folderId query)
router.get("/", verifyToken, ImageController.getImages);

router.get("/:id", verifyToken, ImageController.getImageById);
router.delete("/:id", verifyToken, ImageController.deleteImage);

// features
router.patch("/:id/favorite", verifyToken, ImageController.toggleFavorite);
router.patch("/:id/rename", verifyToken, ImageController.renameImage);
router.post("/:id/duplicate", verifyToken, ImageController.duplicateImage);
router.patch("/:id/share", verifyToken, ImageController.shareImage);
router.patch("/:id/unshare", verifyToken, ImageController.unshareImage);

export const ImageRoutes = router;

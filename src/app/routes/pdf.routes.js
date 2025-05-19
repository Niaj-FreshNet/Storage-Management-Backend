import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { PDFController } from "../controllers/pdf.controller.js";

const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  upload.single("pdf"),
  PDFController.uploadPDF
);

router.get("/", verifyToken, PDFController.getUserPdfs);
router.get("/:id", verifyToken, PDFController.getSinglePdfById);
router.delete("/:id", verifyToken, PDFController.deletePdf);

router.patch("/:id/favorite", verifyToken, PDFController.toggleFavorite);
router.patch("/:id/rename", verifyToken, PDFController.renamePdf);
router.post("/:id/duplicate", verifyToken, PDFController.duplicatePdf);
router.patch("/:id/share", verifyToken, PDFController.sharePdf);
router.patch("/:id/unshare", verifyToken, PDFController.unsharePdf);

export const PDFRoutes = router;

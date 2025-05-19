import express from "express";
import { NoteController } from "../controllers/note.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, NoteController.createNote);
router.get("/", verifyToken, NoteController.getUserNotes);
router.put("/:id", verifyToken, NoteController.updateNote);
router.patch("/:id/rename", verifyToken, NoteController.renameNote);
router.delete("/:id", verifyToken, NoteController.deleteNote);
router.patch("/:id/favorite", verifyToken, NoteController.toggleFavorite);
router.post("/:id/duplicate", verifyToken, NoteController.duplicateNote);
router.patch("/:id/share", verifyToken, NoteController.shareNote);
router.patch("/:id/unshare", verifyToken, NoteController.unshareNote);

export const NoteRoutes = router;

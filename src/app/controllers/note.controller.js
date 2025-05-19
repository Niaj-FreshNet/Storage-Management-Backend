import { NoteService } from "../services/note.service.js";

const createNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content, folderId } = req.body;

    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const note = await NoteService.createNote({ title, content, userId, folderId });

    res.status(201).json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const folderId = req.query.folderId || null;

    const notes = await NoteService.getUserNotes(userId, folderId);

    res.status(200).json({ success: true, data: notes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedNote = await NoteService.updateNote(id, updateData);
    if (!updatedNote) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, data: updatedNote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const renameNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { newTitle } = req.body;

    if (!newTitle) return res.status(400).json({ success: false, message: "New title is required" });

    const updatedNote = await NoteService.updateNote(id, { title: newTitle });
    if (!updatedNote) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, data: updatedNote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await NoteService.deleteNote(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNote = await NoteService.toggleFavorite(id);
    if (!updatedNote) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, data: updatedNote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const duplicateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const duplicated = await NoteService.duplicateNote(id);
    if (!duplicated) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(201).json({ success: true, data: duplicated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const shareNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0)
      return res.status(400).json({ success: false, message: "User IDs array required" });

    const updatedNote = await NoteService.shareNote(id, userIds);
    if (!updatedNote) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, data: updatedNote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const unshareNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0)
      return res.status(400).json({ success: false, message: "User IDs array required" });

    const updatedNote = await NoteService.unshareNote(id, userIds);
    if (!updatedNote) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, data: updatedNote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const NoteController = {
  createNote,
  getUserNotes,
  updateNote,
  renameNote,
  deleteNote,
  toggleFavorite,
  duplicateNote,
  shareNote,
  unshareNote,
};

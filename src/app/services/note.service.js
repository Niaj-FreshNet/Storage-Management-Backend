import Note from "../models/note.model.js";

export const NoteService = {
  createNote: async (data) => {
    return await Note.create(data);
  },

  getUserNotes: async (userId, folderId = null) => {
    const query = { userId };
    if (folderId) {
      query.folderId = folderId;
    }
    return await Note.find(query);
  },

  getNoteById: async (id) => {
    return await Note.findById(id);
  },

  updateNote: async (id, updateData) => {
    return await Note.findByIdAndUpdate(id, updateData, { new: true });
  },

  deleteNote: async (id) => {
    return await Note.findByIdAndDelete(id);
  },

  toggleFavorite: async (id) => {
    const note = await Note.findById(id);
    if (!note) return null;
    note.isFavorite = !note.isFavorite;
    return await note.save();
  },

  duplicateNote: async (id) => {
    const note = await Note.findById(id);
    if (!note) return null;

    const duplicate = new Note({
      title: note.title + " (Copy)",
      content: note.content,
      userId: note.userId,
      folderId: note.folderId,
      isFavorite: false,
      sharedWith: [],
    });

    return await duplicate.save();
  },

  shareNote: async (id, userIds) => {
    const note = await Note.findById(id);
    if (!note) return null;

    userIds.forEach((uid) => {
      if (!note.sharedWith.includes(uid)) {
        note.sharedWith.push(uid);
      }
    });

    return await note.save();
  },

  unshareNote: async (id, userIds) => {
    const note = await Note.findById(id);
    if (!note) return null;

    note.sharedWith = note.sharedWith.filter(
      (uid) => !userIds.includes(uid.toString())
    );

    return await note.save();
  },
};

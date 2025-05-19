import Folder from "../models/folder.model.js";
import Note from "../models/note.model.js";
import Image from "../models/image.model.js";
import PDF from "../models/pdf.model.js";

const getAllFavorites = async (userId) => {
  const [folders, notes, images, pdfs] = await Promise.all([
    Folder.find({ userId, isFavorite: true }),
    Note.find({ userId, isFavorite: true }),
    Image.find({ userId, isFavorite: true }),
    PDF.find({ userId, isFavorite: true }),
  ]);

  return { folders, notes, images, pdfs };
};

export const FavoriteService = { getAllFavorites };

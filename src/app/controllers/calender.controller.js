import Folder from "../models/folder.model.js";
import Image from "../models/image.model.js";
import PDF from "../models/pdf.model.js";
import Note from "../models/note.model.js";
import mongoose from "mongoose";

const getCalendarEntries = async (req, res) => {
  try {
    const userId = req.user._id;
    const { year, month, day, type } = req.query;

    if (!year || !month) {
      return res.status(400).json({ success: false, message: "Year and month are required." });
    }

    // Determine date range based on presence of day
    const startDate = day 
      ? new Date(year, month - 1, day, 0, 0, 0)
      : new Date(year, month - 1, 1, 0, 0, 0);

    const endDate = day
      ? new Date(year, month - 1, day, 23, 59, 59)
      : new Date(year, month, 0, 23, 59, 59);

    const query = {
      userId: new mongoose.Types.ObjectId(userId),
      createdAt: { $gte: startDate, $lte: endDate },
    };

    const models = {
      note: Note,
      image: Image,
      pdf: PDF,
      folder: Folder,
    };

    let result = {};

    if (type) {
      const Model = models[type.toLowerCase()];
      if (!Model) {
        return res.status(400).json({ success: false, message: "Invalid type provided." });
      }
      result[type] = await Model.find(query).sort({ createdAt: 1 });
    } else {
      // Fetch all types
      const [notes, images, pdfs, folders] = await Promise.all([
        Note.find(query).sort({ createdAt: 1 }),
        Image.find(query).sort({ createdAt: 1 }),
        PDF.find(query).sort({ createdAt: 1 }),
        Folder.find(query).sort({ createdAt: 1 }),
      ]);
      result = { notes, images, pdfs, folders };
    }

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getCalendarEntries };

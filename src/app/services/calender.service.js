import Folder from "../models/folder.model.js";
import Image from "../models/image.model.js";
import PDF from "../models/pdf.model.js";
import Note from "../models/note.model.js";
import dayjs from "dayjs";

const groupByDate = (items, type) => {
  const grouped = {};

  items.forEach((item) => {
    const date = dayjs(item.createdAt).format("YYYY-MM-DD");

    if (!grouped[date]) {
      grouped[date] = { folders: [], notes: [], images: [], pdfs: [] };
    }

    grouped[date][type].push(item);
  });

  return grouped;
};

const getCalendarData = async (userId) => {
  const [folders, notes, images, pdfs] = await Promise.all([
    Folder.find({ userId }),
    Note.find({ userId }),
    Image.find({ userId }),
    PDF.find({ userId }),
  ]);

  const allDates = {};

  const types = [
    { data: folders, type: "folders" },
    { data: notes, type: "notes" },
    { data: images, type: "images" },
    { data: pdfs, type: "pdfs" },
  ];

  for (const { data, type } of types) {
    const grouped = groupByDate(data, type);
    for (const date in grouped) {
      if (!allDates[date]) {
        allDates[date] = { folders: [], notes: [], images: [], pdfs: [] };
      }
      allDates[date][type].push(...grouped[date][type]);
    }
  }

  return allDates;
};

export const CalendarService = { getCalendarData };

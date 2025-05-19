import PDF from "../models/pdf.model.js";
import cloudinary from "../config/cloudinary.config.js";

export const uploadPdf = async ({ userId, folderId, file }) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "raw",
          folder: "storage_pdfs",
        },
        async (error, result) => {
          if (error) return reject(error);

          const newPdf = await PDF.create({
            userId,
            folderId: folderId || null,
            name: file.originalname,
            url: result.secure_url,
            publicId: result.public_id,
          });

          resolve(newPdf);
        }
      )
      .end(file.buffer);
  });
};

export const getUserPdfs = async (userId, folderId) => {
  const query = { userId };
  if (folderId) query.folderId = folderId;
  return await PDF.find(query).sort({ updatedAt: -1 });
};

export const getSinglePdfById = async (userId, id) => {
  return await PDF.findOne({ _id: id, userId });
};

export const deletePdf = async (userId, id) => {
  const pdf = await PDF.findOne({ _id: id, userId });
  if (!pdf) throw new Error("PDF not found or unauthorized");

  await cloudinary.uploader.destroy(pdf.publicId, { resource_type: "raw" });
  await pdf.deleteOne();
  return true;
};

export const toggleFavorite = async (userId, id) => {
  const pdf = await PDF.findOne({ _id: id, userId });
  if (!pdf) throw new Error("PDF not found");

  pdf.isFavorite = !pdf.isFavorite;
  await pdf.save();
  return pdf;
};

export const renamePdf = async (userId, id, newName) => {
  const pdf = await PDF.findOne({ _id: id, userId });
  if (!pdf) throw new Error("PDF not found");

  pdf.name = newName;
  await pdf.save();
  return pdf;
};

export const duplicatePdf = async (userId, id) => {
  const original = await PDF.findOne({ _id: id, userId });
  if (!original) throw new Error("PDF not found");

  const duplicate = await PDF.create({
    userId,
    folderId: original.folderId,
    name: `${original.name} (copy)`,
    url: original.url,
    publicId: original.publicId,
    isFavorite: false,
    sharedWith: [],
  });

  return duplicate;
};

export const sharePdf = async (userId, id, userIds) => {
  if (!Array.isArray(userIds)) {
    throw new Error("userIds must be an array");
  }

  const pdf = await PDF.findOne({ _id: id, userId });
  if (!pdf) throw new Error("PDF not found");

  pdf.sharedWith = Array.from(
    new Set([...pdf.sharedWith.map(String), ...userIds.map(String)])
  );

  await pdf.save();
  return pdf;
};

export const unsharePdf = async (userId, id, userIds) => {
  const pdf = await PDF.findOne({ _id: id, userId });
  if (!pdf) throw new Error("PDF not found");

  pdf.sharedWith = pdf.sharedWith.filter(
    (uid) => !userIds.includes(uid.toString())
  );
  await pdf.save();
  return pdf;
};

export const PDFService = {
  uploadPdf,
  getUserPdfs,
  getSinglePdfById,
  deletePdf,
  toggleFavorite,
  renamePdf,
  duplicatePdf,
  sharePdf,
  unsharePdf,
};

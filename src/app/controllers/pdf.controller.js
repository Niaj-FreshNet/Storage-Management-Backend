import { PDFService } from "../services/pdf.services.js";

const uploadPDF = async (req, res) => {
  try {
    const userId = req.user._id;
    const { folderId } = req.body;
    const file = req.file;
    if (!file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    const pdf = await PDFService.uploadPdf({ userId, folderId, file });
    res.status(201).json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserPdfs = async (req, res) => {
  try {
    const userId = req.user._id;
    const folderId = req.query.folderId || null;
    const pdfs = await PDFService.getUserPdfs(userId, folderId);
    res.json({ success: true, data: pdfs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getSinglePdfById = async (req, res) => {
  try {
    const pdf = await PDFService.getSinglePdf(
      req.user._id,
      req.params.id
    );
    if (!pdf)
      return res.status(404).json({ success: false, message: "PDF not found" });

    res.json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deletePdf = async (req, res) => {
  try {
    await PDFService.deletePdf(req.user._id, req.params.id);
    res.json({ success: true, message: "PDF deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const pdf = await PDFService.toggleFavorite(
      req.user._id,
      req.params.id
    );
    res.json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const renamePdf = async (req, res) => {
  try {
    const pdf = await PDFService.renamePdf(
      req.user._id,
      req.params.id,
      req.body.newName
    );
    res.json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const duplicatePdf = async (req, res) => {
  try {
    const pdf = await PDFService.duplicatePdf(
      req.user._id,
      req.params.id
    );
    res.status(201).json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const sharePdf = async (req, res) => {
  try {
    const pdf = await PDFService.sharePdf(
      req.user._id,
      req.params.id,
      req.body.userIds
    );
    res.json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const unsharePdf = async (req, res) => {
  try {
    const pdf = await PDFService.unsharePdf(
      req.user._id,
      req.params.id,
      req.body.userIds
    );
    res.json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const PDFController = {
  uploadPDF,
  getUserPdfs,
  getSinglePdfById,
  deletePdf,
  toggleFavorite,
  renamePdf,
  duplicatePdf,
  sharePdf,
  unsharePdf,
};

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "storage_images",
    // allowed_formats: ["jpg", "jpeg", "png", "gif"],
    // transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const parser = multer({ storage: storage });

export default parser;

import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
    name: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;

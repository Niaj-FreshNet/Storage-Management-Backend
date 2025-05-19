import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    storageUsed: {
      type: Number,
      default: 0, // in bytes
    },
    maxStorage: {
      type: Number,
      default: 15 * 1024 * 1024 * 1024, //15 GB
    },
    resetPasswordOtp: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

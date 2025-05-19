import crypto from "crypto";
import dayjs from "dayjs";
import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwt.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  // Hash password
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  // Generate JWT token
  const token = generateToken({ _id: newUser._id, email: newUser.email });

  return {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    },
    token,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ _id: user._id, email: user.email });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) throw new Error("Current password is incorrect");

  const hashedNewPassword = await hashPassword(newPassword);
  user.password = hashedNewPassword;
  await user.save();

  return "Password updated successfully";
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("No user found with this email");

  const OTP = crypto.randomBytes(3).toString("hex");
  const expiry = dayjs().add(1, "hour").toDate();

  user.resetPasswordOtp = OTP;
  user.resetPasswordExpires = expiry;
  await user.save();

  return {
    message: "Password reset OTP generated",
    OTP,
  };
};

const resetPassword = async (OTP, newPassword) => {
  const user = await User.findOne({
    resetPasswordOtp: OTP,
    resetPasswordExpires: { $gt: new Date() }, // Not expired
  });

  if (!user) throw new Error("Invalid or expired OTP");

  user.password = await hashPassword(newPassword);
  user.resetPasswordOtp = null;
  user.resetPasswordExpires = null;
  await user.save();

  return "Password has been reset successfully";
};

const deleteUser = async (userId) => {
  const result = await User.findByIdAndDelete(userId);
  if (!result) throw new Error("User not found or already deleted");
  return "User deleted successfully";
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken, //We will get the idToken from Google (response.credential) in frontend
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name, picture } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      name,
      email,
      password: null,
      avatar: picture,
    });
    await user.save();
  }

  const token = generateToken({ _id: user._id, email: user.email });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  requestPasswordReset,
  resetPassword,
  deleteUser,
  googleLogin,
};

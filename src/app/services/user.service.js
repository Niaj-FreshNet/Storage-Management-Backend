import User from "../models/user.model.js";

const getAllUsers = async () => {
  return await User.find().select("-password"); //Hide password
};

const getSingleUser = async (id) => {
  return await User.findById(id).select("-password");
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).select(
    "-password"
  );
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};

import { UserServices } from "./../services/user.service.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await UserServices.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users are retrieved succesfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserServices.getSingleUser(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      message: "User is retrieved succesfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newUserData = req.body;

    const updatedUser = await UserServices.updateUser(id, newUserData);

    res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserServices.deleteUser(id);
    res.status(204).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};

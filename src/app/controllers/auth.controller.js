import { AuthServices } from "../services/auth.service.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await AuthServices.registerUser({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user, token },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message || "Registration failed",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthServices.loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    const message = await AuthServices.changePassword(
      userId,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Password change failed",
    });
  }
};

const requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await AuthServices.requestPasswordReset(email);

    res.status(200).json({
      success: true,
      message: result.message,
      OTP: result.OTP, // In production, this would be emailed instead
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { OTP, newPassword } = req.body;
    const message = await AuthServices.resetPassword(OTP, newPassword);

    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const message = await AuthServices.deleteUser(userId);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "User deletion failed",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken) {
      return res
        .status(400)
        .json({ success: false, message: "idToken is required" });
    }

    const result = await AuthServices.googleLogin(idToken);

    res.status(200).json({
      success: true,
      message: "Google sign-in successful",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: err.message || "Google sign-in failed",
    });
  }
};

export const AuthController = {
  registerUser,
  loginUser,
  changePassword,
  requestReset,
  resetPassword,
  deleteUser,
  googleLogin,
};

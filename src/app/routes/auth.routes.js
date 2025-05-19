import express from 'express';
import {AuthController} from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.put("/change-password", verifyToken, AuthController.changePassword);

router.post("/forgot-password", AuthController.requestReset);
router.post("/reset-password", AuthController.resetPassword);

router.delete("/delete-user/:userId", verifyToken, AuthController.deleteUser);

router.post("/google", AuthController.googleLogin);

export const AuthRoutes  = router;
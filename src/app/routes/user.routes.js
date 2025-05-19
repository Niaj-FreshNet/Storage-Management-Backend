import express from "express";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getSingleUser);

router.patch("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;

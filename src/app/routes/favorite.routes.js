import express from "express";
import { getFavorites } from "../controllers/favorite.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getFavorites);

export const FavoriteRoutes = router;

import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getCalendarEntries } from "../controllers/calender.controller.js";

const router = express.Router();

router.get("/", verifyToken, getCalendarEntries);

export const CalendarRoutes = router;

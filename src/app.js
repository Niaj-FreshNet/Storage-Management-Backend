import express from "express";
import cors from "cors";
import { AuthRoutes } from "./app/routes/auth.routes.js";
import { UserRoutes } from "./app/routes/user.routes.js";
import { FolderRoutes } from "./app/routes/folder.routes.js";
import { NoteRoutes } from "./app/routes/note.routes.js";
import { ImageRoutes } from "./app/routes/image.routes.js";
import { PDFRoutes } from "./app/routes/pdf.routes.js";
import { FavoriteRoutes } from "./app/routes/favorite.routes.js";
import { CalendarRoutes } from "./app/routes/calender.routes.js";

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/folders", FolderRoutes);
app.use("/api/v1/notes", NoteRoutes);
app.use("/api/v1/images", ImageRoutes);
app.use("/api/v1/pdf", PDFRoutes);
app.use("/api/v1/favorites", FavoriteRoutes);
app.use("/api/v1/calender", CalendarRoutes);

export default app;

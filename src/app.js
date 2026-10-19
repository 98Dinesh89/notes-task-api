import express from "express";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true, message: "Notes Task API is running...."
    });
});

app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
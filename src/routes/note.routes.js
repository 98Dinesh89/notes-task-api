import { Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/note.controller.js";
import { createNoteValidator, noteIdValidator, updateNoteValidator } from "../validators/note.validator.js";
import validateRequest from "../middleware/validateRequest.js";

const router = Router();

router.post("/", createNoteValidator, validateRequest, createNote);
router.get("/", getNotes);
router.get("/:id", noteIdValidator, validateRequest, getNoteById);
router.patch("/:id", updateNoteValidator, validateRequest, updateNote);
router.delete("/:id", noteIdValidator, validateRequest, deleteNote);

export default router;


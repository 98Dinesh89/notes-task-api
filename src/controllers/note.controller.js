import Note from "../models/Note.js";

export const createNote = async (req, res, next) => {
    try {
        const note = await Note.create(req.body);

        res.status(201).json({
            success: true,
            data: note,
        });
    } catch (error) {
        next(error);
    }
};

export const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find();

        res.status(200).json({
            succes: true,
            count: notes.length,
            data: notes,
        });
    } catch (error) {
        next(error);
    }
};

export const getNoteById = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            data: note
        });
    } catch (error) {
        next(error);
    }
}

export const updateNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findByIdAndUpdate(
            noteId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            data: note,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            data: note
        });
    } catch (error) {
        next(error);
    }
};
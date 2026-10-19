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
        const {
            completed,
            sortBy = "createdAt",
            order = "desc",
            page = "1",
            limit = "10",
        } = req.query;

        const filter = {};

        if (completed !== undefined) {
            if (completed !== "true" && completed !== "false") {
                return res.status(400).json({
                    success: false,
                    message: "completed must be true or false"
                });
            }

            filter.completed = completed === "true";
        }

        const allowedSortFields = ["title", "createdAt", "updatedAt"];
        if (!allowedSortFields.includes(sortBy)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sortBy field"
            });
        }

        if (!["asc", "desc"].includes(order)) {
            return res.status(400).json({
                success: false,
                message: "order must be asc or desc"
            });
        }

        const pageNumber = Number(page);
        const pageSize = Number(limit);

        if (
            !Number.isInteger(pageNumber) ||
            !Number.isInteger(pageSize) ||
            pageNumber < 1 ||
            pageSize < 1 ||
            pageSize > 100
        ) {
            return res.status(400).json({
                succes: false,
                message: "page must be positive and limit must be between 1 and 100",
            });
        }

        const sortOptions = {
            [sortBy]: order === "asc" ? 1 : -1,
        };

        const skip = (pageNumber - 1) * pageSize;

        const [notes, totalItems] = await Promise.all([
            Note.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(pageSize),
            Note.countDocuments(filter)
        ]);

        res.status(200).json({
            sunccess: true,
            data: notes,
            pagination: {
                page: pageNumber,
                limit: pageSize,
                totalItems,
                totalPages: Math.ceil(totalItems / pageSize)
            }
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
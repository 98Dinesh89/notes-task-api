import { body, param } from "express-validator";

export const createNoteValidator = [
    body("title")
        .isString()
        .withMessage("Title must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Title is reqired"),

    body("content")
        .isString()
        .withMessage("Content must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Content is reqired"),

    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be a boolena"),
];

export const noteIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid note ID"),
];

export const updateNoteValidator = [
    ...noteIdValidator,

    body().custom((value) => {
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            throw new Error("Request body must be an object");
        }

        if (Object.keys(value).length === 0) {
            throw new Error("At least one field is required");
        }

        return true;
    }),

    body("title")
        .optional()
        .isString()
        .withMessage("Title must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("content")
        .optional()
        .isString()
        .withMessage("Content must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Content cannot be empty"),

    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be a boolean"),

    body().custom((value) => {
        const allowedFields = ["title", "content", "completed"];
        const invalidFields = Object.keys(value || {}).filter(
            (key) => !allowedFields.includes(key)
        );

        if (invalidFields.length > 0) {
            throw new Error(`Unsupported fields : ${invalidFields.join(", ")}`);
        }

        return true;
    })
];
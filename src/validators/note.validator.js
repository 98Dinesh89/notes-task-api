import { body, param } from "express-validator";

export const createNodeValidator = [
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
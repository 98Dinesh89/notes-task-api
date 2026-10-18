import moongoose from "mongoose";

const noteSchema = new moongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

const Note = moongoose.model("Note", noteSchema);

export default Note;
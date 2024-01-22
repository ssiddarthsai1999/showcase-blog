import mongoose, { Mongoose } from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },

        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;

import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        // You can add additional fields like timestamp if needed
    },
    { timestamps: true }
);

const likePostModel = mongoose.model("LikePost", likeSchema);

export default likePostModel;

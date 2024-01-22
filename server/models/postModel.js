import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        route: { type: String, required: true, unique: true },
        caption: { type: String, required: true },
        slug: { type: String, required: false, unique: true },
        body: { type: String, required: true },
        viewsOnPost: { type: Number, default: 0 },

        category: {
            type: String,
            required: true,
            enum: ["ANALYSIS", "TLDR"],
            default: "ANALYSIS",
        },
        cover_photo: {
            type: String,
            required: true,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        tags: { type: [String] },
        // categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],
        likes: { type: Number, default: 0 },
        likedList: [{ type: mongoose.Schema.Types.ObjectId, ref: "LikePost" }],
        featured: { type: Boolean, default: false },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

postSchema.pre("save", async function (next) {
    if (this.isModified("featured") && this.featured) {
        // If the current post is being set as featured, unset the feature on other posts
        await this.constructor.updateMany(
            { _id: { $ne: this._id } },
            { featured: false }
        );
    }
    next();
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;

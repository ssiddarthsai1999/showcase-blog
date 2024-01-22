import express from "express";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import likePostModel from "../models/likePostModel.js";
import authenticateToken from "./authenticateToken.js";
const router = express.Router();

//liking and unliking post
router.post("/createLikeForPost", authenticateToken, async (req, res) => {
    try {
        const { post } = req.body;
        const user = req.user.id;
        const likedPost = await postModel.findById(post);
        if (!likedPost) {
            return res.status(500).json({
                message: "Post not available",
                error: "Post not found",
            });
        }

        const likedUser = await userModel.findById(user);
        if (!likedUser) {
            return res.status(500).json({
                message: "User not available",
                error: "User not found",
            });
        }

        const existingLike = await likePostModel.findOneAndDelete({
            user,
            post,
        });

        if (existingLike) {
            // First, decrement the likes count and remove the user from the likedList
            likedPost.likes -= 1;
            likedPost.likedList.pull(likedUser._id);
            await likedPost.save();

            return res
                .status(200)
                .json({
                    message: "Unliked post",
                    unlike: existingLike,
                    post: likedPost,
                });
        }

        // If the like doesn't exist, increment the likes count and add the user to the likedList
        const newLike = new likePostModel({ user, post });
        await newLike.save();

        likedPost.likes += 1;
        likedPost.likedList.push(likedUser._id);
        await likedPost.save();

        return res.status(200).json({ message: "Liked post", like: newLike, post: likedPost });
    } catch (error) {
        console.error("Error creating post:", error);
        return res
            .status(500)
            .json({ message: "Error occurred", error: error.message });
    }
});
//--------------------------------------------------------------------------------
export default router;

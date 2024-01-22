import express from "express";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import likePostModel from "../models/likePostModel.js";

import authenticateToken from "./authenticateToken.js";
const router = express.Router();
//add comments for a post--------------------------------------------------------------------------------
router.post("/addComment/:postId", authenticateToken, async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;
    try {
        const userId = req.user.id;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(500).json({
                message: "User not available",
                error: "User not found",
            });
        }

        // Check if the post exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(500).json({
                message: "Post not available",
                error: "Post not found",
            });
        }

        // Create a new comment
        const comment = {
            user: userId,
            post: postId,
            content: content,
        };

        // Add the comment to the post's comments array
        const newComment = await commentModel.create(comment);
        await newComment.populate({ path: "user", select: "-password" });
        // Save the updated post
        post.comments.push(newComment);
        await post.save();

        return res.status(200).json({
            message: "Comment added successfully",
            comment: newComment,
            post: post,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred",
            error: error.message,
        });
    }
});

//get comments for a post--------------------------------------------------------------------------------
router.get("/getCommentsForPost/:postId", async (req, res) => {
    const { postId } = req.params;
    const { sortBy, sortOrder, page = 1, limit = 2 } = req.query;

    let sortOptions = {};

    if (sortBy && sortOrder) {
        sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    try {
        const comments = await commentModel
            .find({ post: postId })
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate({
                path: "user",
                select: "-password",
            });

        const commentCount = await commentModel.countDocuments({
            post: postId,
        });

        const response = {
            totalComments: commentCount,
            totalPages: Math.ceil(commentCount / limit),
            page: page,
            comments,
        };

        return res
            .status(200)
            .json({ message: "Comments fetched", commentDetails: response });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred",
            error: error.message,
        });
    }
});





//delete comments for a post--------------------------------------------------------------------------------
router.delete("/deleteComment/:postId", authenticateToken, async (req, res) => {
    const { postId } = req.params;
    const { commentId } = req.body;

    try {
        const userId = req.user.id;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(500).json({
                message: "User not available",
                error: "User not found",
            });
        }

        // Check if the post exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(500).json({
                message: "Post not available",
                error: "Post not found",
            });
        }

        // Find the index of the comment within the post's comments array
        const commentIndex = post.comments.findIndex(
            (comment) => comment.toString() === commentId
        );

        if (commentIndex === -1) {
            return res.status(400).json("No such comment found for this post");
        }

        // Check if the user who wrote the comment can delete their comment
        const commentToDelete = await commentModel.findById(commentId);
        if (!commentToDelete || commentToDelete.user.toString() !== userId) {
            return res.status(401).json("Unauthorized to delete this comment");
        }

        // Remove the comment from the post's comments array
        post.comments.splice(commentIndex, 1);
        await post.save();

        // Delete the comment from the commentModel
        const commentFromModel = await commentModel.findByIdAndDelete(
            commentId
        );

        if (!commentFromModel) {
            return res.status(400).json("No such comment found");
        }

        return res.status(200).json({
            message: "Comment deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred",
            error: error.message,
        });
    }
});

export default router;

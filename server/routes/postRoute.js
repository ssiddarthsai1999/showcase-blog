import express from "express";
import postModel from "../models/postModel.js";
import authenticateToken from "./authenticateToken.js";
import authenticateAdmin from "./authenticateAdmin.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
const router = express.Router();

router.post("/createPost", authenticateAdmin, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(500).json({
                message: "User not admin or doesnt exist",
                error: error.message,
            });
        }

        const { tags, title, body, caption, cover_photo, category, route } =
            req.body;

        const post = new postModel({
            title,
            caption,
            slug: uuidv4(),
            body,
            user: userId,
            tags,
            cover_photo,
            category,
            route,
        });

        const createdPost = await post.save();
        return res
            .status(200)
            .json({ message: "Post created", post: createdPost });
    } catch (error) {
        console.error("Error creating post:", error);
        return res
            .status(500)
            .json({ message: "Error occurred", error: error.message });
    }
});

router.get("/getAllPosts", async (req, res) => {
    try {
        const { sortBy, sortOrder, page = 1, limit = 2 } = req.query;

        const startIndex = (page - 1) * limit;

        let sortOptions = {};

        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
        }

        const postsCount = await postModel.countDocuments();
        const posts = await postModel
            .find()
            .sort(sortOptions)
            .skip(startIndex)
            .limit(parseInt(limit));

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        const response = {
            totalPosts: postsCount,
            totalPages: Math.ceil(postsCount / limit),
            currentPage: page,
            posts,
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while getting posts",
            error: error.message,
        });
    }
});

router.get("/getFeaturedPost", async (req, res) => {
    try {
        const post = await postModel.findOne({ featured: true });

        if (!post || post.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }
        return res
            .status(200)
            .json({ message: "Featured post is fetched", post: post });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while getting posts",
            error: error.message,
        });
    }
});

router.get("/getAllPostsForCategory", async (req, res) => {
    try {
        const { sortBy, sortOrder, page = 1, limit = 2, category } = req.query;

        const startIndex = (page - 1) * limit;

        let sortOptions = {};

        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
        }
        const query = category
            ? { category: { $in: category.split(",") } }
            : {}; // Use $in for multiple categories
        const postsCount = await postModel.countDocuments(query);
        const posts = await postModel
            .find(query)
            .sort(sortOptions)
            .skip(startIndex)
            .limit(parseInt(limit));

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        const response = {
            totalPosts: postsCount,
            totalPages: Math.ceil(postsCount / limit),
            currentPage: page,
            posts,
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while getting posts",
            error: error.message,
        });
    }
});

router.get("/getEachPost/:route", async (req, res) => {
    const { route } = req.params;
    try {
        const post = await postModel.findOne({ route: route });
        if (!post) {
            return res
                .status(404)
                .json({ message: "No post found with this route" });
        }
        post.viewsOnPost += 1;
        await post.save();
        return res
            .status(200)
            .json({ message: "Fetched the post with route", post });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while getting the post with this route",
            error: error.message,
        });
    }
});

router.get("/getEachPostAdmin/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res
                .status(404)
                .json({ message: "No post found with this id" });
        }
        return res
            .status(200)
            .json({ message: "Fetched the post with id", post });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while getting the post",
            error: error.message,
        });
    }
});

router.delete("/deleteEachPost", authenticateAdmin, async (req, res) => {
    const { id } = req.body;
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(500).json({
                message: "User not admin or doesnt exist",
                error: error.message,
            });
        }

        const post = await postModel.findByIdAndDelete(id);
        if (!post) {
            return res
                .status(400)
                .json({ message: "No post found with this id", error: error });
        }
        return res
            .status(200)
            .json({ message: " Deleted the post with id", post });
    } catch (error) {
        return res.status(400).json({
            message: "Error occurred while getting all posts",
            error: error,
        });
    }
});

router.put("/editEachPost/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const {
        title,
        caption,
        cover_photo,
        tags,
        body,
        category,
        route,
        featured,
    } = req.body;
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(500).json({
                message: "User not admin or doesnt exist",
                error: error.message,
            });
        }

        const post = await postModel.findByIdAndUpdate(
            id,
            {
                title,
                caption,
                cover_photo,
                tags,
                body,
                category,
                route,
                featured,
            },
            { new: true }
        );
        if (!post) {
            return res
                .status(404)
                .json({ message: "No post found with this id" });
        }
        return res
            .status(200)
            .json({ message: "Updated the post with id", post });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while updating the post",
            error: error.message,
        });
    }
});

// router.put("/setFeatured", authenticateAdmin,async(req,res)=>{
//     try {
//           const userId = req.user.id;
//           if (!userId) {
//               return res.status(500).json({
//                   message: "User not admin or doesnt exist",
//                   error: error.message,
//               });
//           }

//     } catch (error) {
//                 return res.status(500).json({
//                     message: "Error occurred while featuring the post",
//                     error: error.message,
//                 });
//     }
// })

export default router;

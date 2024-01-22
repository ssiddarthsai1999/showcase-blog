import express from "express";
import subscribeModel from "../models/subscribeModel.js";
import authenticateToken from "./authenticateToken.js";
import { v4 as uuidv4 } from "uuid";

import multer from "multer";
const router = express.Router();

//subscribebuttonpost
router.post("/createSubscription",async (req, res) => {
    try {

        
        const { email } = req.body;

        // Use findOne with a query object
        const existingEmail = await subscribeModel.findOne({ email });

        if (existingEmail) {
            return res.status(400).json("User already subscribed");
        }

        const newSub = new subscribeModel({
            email,
        });

        const subscriber = await newSub.save();
        return res
            .status(200)
            .json({ message: "Subscription created", data: subscriber });
    } catch (error) {
        console.error("Error adding subscription:", error);
        return res
            .status(500)
            .json({ message: "Error occurred", error: error.message });
    }
});

router.get("/getAllSubscribers", async (req, res) => {
    const { page = 1, limit = 1 } = req.query;
    const subsCount = await subscribeModel.countDocuments();
    const startIndex = (page - 1) * limit;
    try {
        const subs = await subscribeModel
            .find()
            .skip(startIndex)
            .limit(parseInt(limit));
        if (!subs || subs.subs === 0) {
            return res.status(404).json({ message: "No subscribers found" });
        }
        const response = {
            totalSubs: subsCount,
            totalPages: Math.ceil(subsCount / limit),
            currentPage: page,
            subs,
        };
        return res
            .status(200)
            .json({ message: "Subscribers fetched", subscribers: response });
    } catch (error) {
        console.error("Error getting subscribers:", error);
        return res
            .status(500)
            .json({ message: "Error occurred", error: error.message });
    }
});

export default router;

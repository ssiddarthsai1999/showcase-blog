import mongoose from "mongoose";
// import productModel from "./productModel.js";
import moment from "moment-timezone";

const subscribeSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },

        createdAt: {
            type: Date,
            default: new Date(),
        },
    },
    { timestamps: false }
);

const subscribeModel = mongoose.model("Subscribe", subscribeSchema);
export default subscribeModel;

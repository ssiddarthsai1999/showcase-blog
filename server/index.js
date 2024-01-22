import express from "express";
//adawd
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import subscribeRoute from "./routes/subscribeRoute.js";
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import likePostRoute from "./routes/likePostRoute.js";
import commentRoute from "./routes/commentRoute.js";
import path from "path";
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

//connect with mongoose
mongoose
    .connect(process.env.MONGO_URL)
    .then(() =>
        app.listen(process.env.PORT, () =>
            console.log(`connected to ${process.env.PORT}`)
        )
    )
    .catch((err) => console.log(err));

//usage of routes
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/subscribe", subscribeRoute);
app.use("/likePost", likePostRoute);
app.use("/commentPost", commentRoute);

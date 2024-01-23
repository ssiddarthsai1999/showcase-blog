import React from "react";
import ArticleCard from "./ArticleCard/ArticleCard";
import bali from "../../Assets/staticassets/bali.jpg";
import hungary from "../../Assets/staticassets/hungary.jpg";
import japan from "../../Assets/staticassets/japan.jpg";
import { Link } from "react-router-dom";

function ArticleC() {
    const articleData = [
        {
            title: "Exploring the Beauty of Bali",
            author: "Sarah Smith",
            country: "Bali",
            caption:
                "Embark on a journey to the tropical paradise of Bali and experience its breathtaking landscapes and vibrant culture.",
            createdAt: "2024-02-10",
            img: bali, // Replace with actual image path
        },
        {
            title: "Discovering the Charms of Hungary",
            author: "András Kovács",
            country: "Hungary",
            caption:
                "Explore the historic streets and vibrant culture of Hungary, and uncover its hidden gems.",
            createdAt: "2024-02-08",
            img: hungary, // Replace with actual image path
        },
        {
            title: "Japan's Cherry Blossom Season",
            author: "Yuki Tanaka",
            country: "Japan",
            caption:
                "Immerse yourself in the beauty of Japan's cherry blossoms during the enchanting sakura season.",
            createdAt: "2024-02-05",
            img: japan, // Replace with actual image path
        },
    ];

    return (
        <div className="flex  mx-auto align-middle justify-evenly flex-col  w-full items-center ">
            <div className=" p-14">
                <h2 className="mb-4 text-center">Most popular articles.</h2>
                <p className=" text-center">
                    "Discover our Top Picks: The Hottest Articles Right Now!"
                </p>
            </div>
            <div className="   flex justify-center ">
                <ArticleCard articleData={articleData} />
            </div>
            <Link to="/destinations">
                <button className="button1 mt-10">Explore all</button>
            </Link>
        </div>
    );
}

export default ArticleC;

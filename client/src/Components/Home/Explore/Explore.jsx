import React from "react";
import hungary from "../../../Assets/staticassets/hungary.jpg";
import japan from "../../../Assets/staticassets/japan.jpg";
import bali from "../../../Assets/staticassets/bali.jpg";

import ExploreCard from "./card/ExploreCard";
import "./explore.css";
export default function Explore() {
    const data = [
        {
            image: hungary,
            country: "Hungary",
            linkToPost: "https://www.instagram.com/p/C0O4tgqvqcg/",
        },
        {
            image: japan,
            country: "Japan",
            linkToPost: "https://www.instagram.com/p/C0IQjwAPDoK/",
        },
        {
            image: bali,
            country: "Bali",
            linkToPost: "https://www.instagram.com/p/C0BfNIevskR/",
        },
    ];

    return (
        <div className="  max-w-full md:max-w-[100%] w-full md:px-24 px-4 md:py-10 py-10     mx-auto">
            <div className=" p-14">
                <h2 className="mb-4 text-center">Explore via location</h2>
                <p className="text-center">
                    "Explore Our Stunning Destinations Around the World"
                </p>
            </div>
            <ExploreCard data={data} />
        </div>
    );
}

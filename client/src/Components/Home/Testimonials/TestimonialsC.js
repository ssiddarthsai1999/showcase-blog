import React from "react";

import TestimonialCard from "./TestimonialsCard/TestimonialsCard";
import p1 from "../../../Assets/staticassets/p1.jpg";
import p2 from "../../../Assets/staticassets/p2.jpg";
import p3 from "../../../Assets/staticassets/p3.jpg";

function TestimonialsC() {
const testimonials = [
    {
        id: 1,
        imageSrc: p1, // Replace with actual image path
        quote: "This travel blog has been an incredible resource for planning my trips. The detailed guides and insider tips made my travels hassle-free and unforgettable.",
        name: "Sarah Anderson",
        title: "Adventurous Explorer",
    },
    {
        id: 2,
        imageSrc: p2, // Replace with actual image path
        quote: "I can't thank this travel blog enough for all the inspiration it provided. It encouraged me to explore new destinations and create amazing memories with my family.",
        name: "David Chen",
        title: "Family Travel Enthusiast",
    },
    {
        id: 3,
        imageSrc: p3, // Replace with actual image path
        quote: "As a solo traveler, this blog has been my trusted companion. The solo travel guides and safety tips gave me the confidence to explore the world on my own terms.",
        name: "Emily Wilson",
        title: "Solo Adventurer",
    },
];


    return (
        <div className="flex  mx-auto align-middle justify-evenly flex-col  w-full items-center ">
            <div className=" p-14">
                <h2 className="mb-4 text-center">What Our Subscribers Say</h2>
                <p className="text-center">
                    "Read what our satisfied customers have to say about their
                    experiences."
                </p>
            </div>
            <div className="   flex justify-center ">
                <TestimonialCard testimonials={testimonials} />
            </div>
     
        </div>
    );
}

export default TestimonialsC;

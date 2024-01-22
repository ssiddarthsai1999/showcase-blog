import React from "react";


import CategoriesCard from "./card/CategoriesCard";
export default function Categoriess() {
    const data = [
        {
            title: "NFT",
            image: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1701993600&semt=sph",
        },
        {
            title: "NFT",
            image: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?cs=srgb&dl=pexels-simon-berger-1266810.jpg&fm=jpg",
        },
        {
            title: "NFT",
            image: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1701993600&semt=sph",
        },
        {
            title: "NFT",
            image: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1701993600&semt=sph",
        },

    ];

    return (
        <div className="md:pb-[10px]  md:pt-[20px] homespan mt-10">
            <span className=" ml-[10px] ">{`// categories`}</span>
            <CategoriesCard data={data} />
        </div>
    );
}

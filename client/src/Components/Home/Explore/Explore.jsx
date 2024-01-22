import React from "react";
import snap1 from "../../../Assets/pull/snap1.jpg";
import snap2 from "../../../Assets/pull/snap2.jpg";
import snap3 from "../../../Assets/pull/snap3.jpg";
import snap4 from "../../../Assets/pull/snap4.jpg";
import snap5 from "../../../Assets/pull/snap5.jpg";
import instagram from "../../../Assets/favicon/instagram.svg";
import ExploreCard from "./card/ExploreCard";
export default function Explore() {
    const data = [
        {
            image: snap1,
            icon: instagram,
            linkToPost: "https://www.instagram.com/p/C0O4tgqvqcg/",
        },
        {
            image: snap2,
            icon: instagram,
            linkToPost: "https://www.instagram.com/p/C0IQjwAPDoK/",
        },
        {
            image: snap3,
            icon: instagram,
            linkToPost: "https://www.instagram.com/p/C0BfNIevskR/",
        },
        {
            image: snap4,
            icon: instagram,
            linkToPost: "https://www.instagram.com/p/Cz_QkrSy26U/",
        },
        {
            image: snap5,
            icon: instagram,
            linkToPost: "https://www.instagram.com/p/Cz09MObSupx/",
        },
        // {
        //     image: "https://cdn.pixabay.com/photo/2018/01/23/23/17/waters-3102729_1280.jpg",
        // },
    ];

    return (
        <div className="md:pb-[10px] pb-[10px] pt-[20px] md:pt-[40px] homespan">
            <span className="md:mb-[100px] ml-[10px] ">{`// explore`}</span>
            <ExploreCard data={data} />
        </div>
    );
}

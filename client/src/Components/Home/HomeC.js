import React from "react";
import CryptoLiveUpdates from "./CryptoLiveUpdates/CryptoLiveUpdates";
import Footers from "./Footers/Footers";
import Categoriess from "./Categories/Categoriess";
import Explore from "./Explore/Explore";
import HearMore from "./HearMore/HearMore";
import NewsLetter from "./NewsLetter/newsLetter";
import Featured from "./Featured/Featured";
import RecentArticles from "./RecentArticles/RecentArticles";
import NFTLiveUpdates from "./CryptoLiveUpdates/NFTLiveUpdates";
import Hero from "../../Pages/Hero/Hero";
import buildingroof from "../../Assets/staticassets/buildingroof.jpg";
import Article from "../../Pages/Article/Article";
import TestimonialsC from "./Testimonials/TestimonialsC";


function HomeC() {
    return (
        <div>
            <div className="max-w-full w-full mx-auto  ">
                <div>
                    {" "}
                    <Hero />
                </div>
                <div className="md:mt-24 mt-10">
                    {" "}
                    <NewsLetter />
                </div>
                <div className="max-w-full md:max-w-[90%] w-full md:px-24 px-4 md:py-10 py-10  md:mt-24 mt-10   mx-auto">
                    {" "}
                    <Article />
                </div>
                <div className="">
                    {" "}
                    <Explore />
                </div>

                <div className="max-w-full md:max-w-[90%] w-full md:px-24 px-4 md:py-10 py-10  md:mt-24 mt-10   mx-auto">
                    {" "}
                    <TestimonialsC />
                </div>
                {/* <div className="md:px-24 px-4">
                    {" "}
                    <Featured />
                </div>

                <div className="md:px-24 px-4">
                    {" "}
                    <RecentArticles />
                </div> */}
                {/* <div className="md:px-24 px-4">
                    {" "}
                    <HearMore />
                </div> */}

                {/* 
                <div className="md:px-24 px-2">
                    {" "}
                    <Categoriess />
                </div> */}
            </div>
        </div>
    );
}

export default HomeC;

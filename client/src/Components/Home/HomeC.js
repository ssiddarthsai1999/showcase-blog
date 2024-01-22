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

function HomeC() {
    return (
        <div>
            {/* <CryptoLiveUpdates /> */}
            <NFTLiveUpdates/>

            <div className="max-w-full w-full mx-auto  ">
                <div className="md:px-24 px-4">
                    {" "}
                    <Featured />
                </div>

                <div>
                    {" "}
                    <NewsLetter />
                </div>
                <div className="md:px-24 px-4">
                    {" "}
                    <RecentArticles />
                </div>
                <div className="md:px-24 px-4">
                    {" "}
                    <HearMore />
                </div>
                <div className="md:px-24 px-4">
                    {" "}
                    <Explore />
                </div>
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

import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";



import { Spinner, Stack } from "@chakra-ui/react";
import {
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    VStack,
    HStack,
    Text,
} from "@chakra-ui/react";

function TopStoryCard({ data, isLoading, scrollRef }) {
    return (
        <div
            className=" flex flex-nowrap gap-10 md:gap-24 w-full h-fit overflow-x-hidden   z-0 py-1 md:py-10  "
            ref={scrollRef}
        >
            {isLoading ? (
                <Stack
                    direction="row"
                    className="flex justify-center mx-auto "
                    spacing={4}
                >
                    <Spinner size="xl" />
                </Stack>
            ) : data?.posts?.length > 0 ? (
                data.posts.map((item, pageIndex) => (
                    <div
                        key={pageIndex}
                        className="flex lg:min-w-[40%] lg:h-[380px] w-[60%] min-w-[70%]  mb-10 allPostCardBg  relative    gap-4 md:gap-24 "
                    >
                        <Link
                            to={`/projects/${item.route}`}
                            className="    shadow-xl w-full  duration-100 ease-in hover:border border-[#41FFFF] "
                        >
                            <div className=" justify-center items-start min-h-full h-full flex flex-col    w-full gap-2  ">
                                <img
                                    src={item.cover_photo}
                                    alt=""
                                    className="w-full h-full object-cover  "
                                />
                                <div className="flex  flex-col items-start  md:pt-2 absolute  bottom-0 md:bottom-10 p-2 left-0 md:left-10 ">
                                    <h4
                                        style={{
                                            fontFamily: "SFPRODISPLAYREGULAR",
                                        }}
                                        className="text-[#41FFFF] text-[8px] md:text-[14px] font-[700] leading-[16px] text-left mb-3"
                                    >
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}
                                    </h4>
                                    <h2
                                        className="text-left image__text text-white text-[10px] md:text-[20px] font-[700] leading-[20px] md:leading-[30px]"
                                
                                    >
                                        {item.title.slice(0, 85)}{" "}
                                        {item.title.length > 85 && "..."}
                                    </h2>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-center mx-auto">
                    <h1 className="text-center py-[100px]">
                        There are no posts to render!
                    </h1>
                </div>
            )}
        </div>
    );
}

export default TopStoryCard;

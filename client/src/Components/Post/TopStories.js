import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import AllPostsCard from "./Cards/AllPostsCard";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopStoryCard from "./Cards/TopStoryCard";
function TopStories() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortState, setSortState] = useState("recent");
    const [activeSort, setActiveSort] = useState(sortState);
    const scrollRef = useRef(null);

    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true);
            try {
                let sortByParam = "createdAt";
                let sortOrderParam = "desc";

                if (sortState === "popular") {
                    // Set parameters for popular sorting
                    sortByParam = "likes"; // Change this to the appropriate field
                    sortOrderParam = "desc"; // Change this to "asc" if needed
                }

                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/post/getAllPosts`,
                    {
                        params: {
                            sortBy: sortByParam,
                            sortOrder: sortOrderParam,
                            limit: 16,
                        },
                    }
                );

                setIsLoading(false);
                setData(response.data);
                console.log(response.data.posts, "response");
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getAllPosts();
        setActiveSort(sortState);
    }, [sortState]);
    console.log("activeSort", activeSort);

    // ... (previous code)

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 800,
                behavior: "smooth",
            });
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;

            container.scrollBy({
                left: -800,
                behavior: "smooth",
            });

            // Hide right arrow when scrolled to the end
        }
    };

    return (
        <div className="relative pt-[20px] md:pt-[100px] my-10  px-2 md:px-24 w-full   bgBlue">
            <div className=" homespan pb-[40px] flex items-center  w-full  ">
                <div className="flex justify-between  w-full ">
                    <div className=" flex gap-5 flex-col">
                        <span className="">{`>_top stories`}</span>
                        <h1 className="">Read more news</h1>
                    </div>
                    <div className=" flex gap-8 ">
                        <div className="sticky   ">
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                style={{
                                    color: "black",
                                }}
                                onClick={scrollLeft}
                                className="text-md w-3 bg-[#3FFFFF]  md:text-5xl z-50 rounded-[50%] cursor-pointer px-4 py-4 md:py-0 md:px-4 "
                            />
                        </div>
                        <div className=" ">
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                style={{
                                    color: "black",
                                }}
                                onClick={scrollRight}
                                className="text-sm w-3 bg-[#3FFFFF]  md:text-5xl z-50 rounded-[100%]  cursor-pointer px-4 py-4 md:py-0 md:px-4"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <TopStoryCard
                data={data}
                isLoading={isLoading}
                scrollRef={scrollRef}
            />
        </div>
    );
}

export default TopStories;

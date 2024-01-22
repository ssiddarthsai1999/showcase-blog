import { useEffect, useState, useRef } from "react";
import React from "react";

import axios from "axios";
import AllPostsCard from "../../Post/Cards/AllPostsCard";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function RecentArticles() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortState, setSortState] = useState("recent");

    const [activeSort, setActiveSort] = useState(sortState);
    const [likedList, setLikedList] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState("657804d920f2ebbc38b0899f");
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const maxScroll = container.scrollWidth;

            // Update arrow visibility based on scroll position
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft + container.clientWidth < maxScroll
            );
            console.log("showLeftArrow", showLeftArrow);
            // If scrolled to the end, hide the right arrow
            if (container.scrollLeft + container.clientWidth >= maxScroll) {
                setShowRightArrow(false);
            }
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            container.addEventListener("scroll", handleScroll);

            return () => {
                container.removeEventListener("scroll", handleScroll);
            };
        }
    }, [scrollRef]);
    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true);
            try {
                let sortByParam = "createdAt";
                let sortOrderParam = "desc";

                if (sortState === "popular") {
                    // Set parameters for popular sorting
                    sortByParam = "viewsOnPost"; // Change this to the appropriate field
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
 const likedAnyPost = response.data.posts.some((item) => {
     const isUserLiked =
         item.likedList &&
         item.likedList.includes(user) &&
        response.data.posts.map((x)=>x.id===item.id);
     setIsLiked(isUserLiked); // Set isLiked for each post individually
     return isUserLiked; // Return true if the user is liked for this post
 });
                setLikedList(response.data.posts.map((item) => item.likedList));
                setIsLoading(false);
                setData(response.data);
                setIsLiked(likedAnyPost);
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
            if (container.scrollLeft <= 0) {
                setShowLeftArrow(false);
            } else {
                setShowLeftArrow(true);
            }
        }
    };
    console.log("Is liked:", isLiked);
    return (
        <div className="relative pt-[20px] md:pt-[100px]">
            <div className=" homespan pb-[40px] flex items-center  w-full  ">
                <div className="absolute right-10 md:top-[53%] top-[50%] z-50 ">
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{
                            color: "#ffffff",
                            display: showRightArrow ? "block" : "none",
                        }}
                        onClick={scrollRight}
                        className="text-lg md:text-3xl z-50 rounded-[50%] border-2 cursor-pointer  p-4 hover:bg-[#41FFFF] ease-in duration-100 hover:text-black"
                    />
                </div>
                <div className="absolute left-10 md:top-[53%] top-[50%] z-50  ">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        style={{
                            color: "#ffffff",
                            display: showLeftArrow ? "block" : "none",
                        }}
                        onClick={scrollLeft}
                        className="text-lg md:text-3xl z-50 rounded-[50%] hover:bg-[#41FFFF] border-2  cursor-pointer p-4 ease-in duration-100"
                    />
                </div>

                <div className="flex justify-between  w-full ">
                    <div className="">
                        <span className="">{`// most ${sortState} articles`}</span>
                    </div>
                    <div className="gap-2 md:gap-4 flex ">
                        <button
                            className={`border md:px-3 md:py-2 px-1 py-0 text-[8px] md:text-[12px] ${
                                activeSort === "recent" && "bg-white text-black"
                            }`}
                            onClick={() => setSortState("recent")}
                        >
                            Most Recent
                        </button>
                        <button
                            className={`border md:px-3 md:py-2 px-1 py-0 text-[8px] md:text-[12px] ${
                                activeSort === "popular" &&
                                "bg-white text-black"
                            }`}
                            onClick={() => setSortState("popular")}
                        >
                            Most Popular
                        </button>
                    </div>
                </div>
            </div>
            <AllPostsCard
                data={data}
                isLoading={isLoading}
                scrollRef={scrollRef}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                user={user}
                setLikedList={setLikedList}
                likedList={likedList}
            />
        </div>
    );
}

export default RecentArticles;

import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

function AllPostsCard({ data, isLoading, scrollRef, likedList, setLikedList, user,isLiked,setIsLiked }) {
    const navigate = useNavigate();

    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const handleLike = async (postId) => {
        try {
            const profileData = JSON.parse(localStorage.getItem("profile"));
            const userToken = profileData?.token;

            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/likePost/createLikeForPost`,
                {
                    post: postId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            // Update likedList based on the API response
            const updatedLikedList = response.data.post.likedList;
            setLikedList(updatedLikedList);

            // Update isLiked based on whether the current user is in the likedList
            const liked = updatedLikedList.includes(user);
            setIsLiked(liked);


            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast.error(error, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("Error liking post:", error);
        }
    };

    const chunkedPosts = data?.posts ? chunkArray(data.posts, 4) : [];
    console.log("likedList", likedList);




    return (
        <div
            className=" flex flex-wrap gap-10 w-full h-fit overflow-x-hidden z-0 py-3 md:py-10 blackFadeImage"
            ref={scrollRef}
        >
            {isLoading ? (
                <Stack
                    direction="row"
                    className="flex justify-center mx-auto"
                    spacing={4}
                >
                    <Spinner size="xl" />
                </Stack>
            ) : data?.posts?.length > 0 ? (
                <>
                    {chunkedPosts.map((chunk, pageIndex) => (
                        <div
                            key={pageIndex}
                            className="flex w-full mb-10  gap-10 md:gap-24 "
                        >
                            {chunk.map((item) => (
                                <Link
                                    to={`/projects/${item.route}`}
                                    className="allPostCardBg w-[70%] min-w-[70%]    md:w-[40%] md:min-w-[40%]  gap-10 shadow-xl  duration-100 ease-in border border-transparent hover:border-[#41FFFF]"
                                >
                                    <div key={item.id}>
                                        <div className="flex flex-col md:flex-row w-full">
                                            <img
                                                src={item.cover_photo}
                                                alt=""
                                                className="md:h-[300px] w-full h-[100px] md:w-[30%] min-h-full object-cover  bg-center"
                                            />
                                            <div className="justify-center items-start min-h-full h-full flex flex-col p-3  md:p-10 w-full gap-2  ">
                                                <div className="flex gap-3 items-center  md:pt-2   relative">
                                                    <button
                                                        style={{
                                                            fontFamily:
                                                                '"AkiraExpanded", sans-serif',
                                                        }}
                                                        className="bg-[#41FFFF] text-black py-[4px] px-[12px] gap-[8px] text-[8px] md:text-[12px]  rounded-[2px] font-bold"
                                                    >
                                                        NFT PROJECTS
                                                    </button>
                                                    <h4
                                                        style={{
                                                            fontFamily:
                                                                "SFPRODISPLAYREGULAR",
                                                        }}
                                                        className="text-[#41FFFF] text-[8px] md:text-[14px] font-[700] leading-[16px]"
                                                    >
                                                        {new Date(
                                                            item.createdAt
                                                        ).toLocaleDateString()}
                                                    </h4>
                                                </div>
                                                <h3
                                                    className="text-left  text-white text-[12px] md:text-[20px] font-[700] leading-[20px] md:leading-[30px]"
                                                    style={{
                                                        fontFamily:
                                                            "AkiraExpanded",
                                                    }}
                                                >
                                                    {item.title.slice(0, 85)}{" "}
                                                    {item.title.length > 85 &&
                                                        "..."}
                                                </h3>

                                                <h3
                                                    className="text-left text-[#FFFFFFC9] text-[8px] md:text-[18px] font-[400] leading-[30px]"
                                                    style={{
                                                        fontFamily:
                                                            "SFPRODISPLAYREGULAR",
                                                    }}
                                                >
                                                    {item.caption.slice(0, 205)}{" "}
                                                    {item.caption.length >
                                                        205 && "..."}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {chunk.map((x) => (
                                <h4
                                    onClick={() => handleLike(x.id)}
                                    style={{
                                        fontFamily: "SFPRODISPLAYREGULAR",
                                    }}
                                    className="text-[#41FFFF] cursor-pointer hover:text-red-600 text-[8px] md:text-[14px] font-[700] leading-[16px] gap-2 flex items-center absolute top-[64%] left-[14%] "
                                >
                                    <p>
                                        {isLiked ? (
                                            <i className="fa-solid fa-heart text-[#3fffff]"></i>
                                        ) : (
                                            <i className="fa-regular fa-heart text-[#3fffff] hover:text-red-600"></i>
                                        )}
                                    </p>
                                    {x.likes}
                                </h4>
                            ))}
                        </div>
                    ))}
                </>
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

export default AllPostsCard;

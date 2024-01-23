import React from "react";
import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
} from "react-share";
import ReactMarkdown from "react-markdown";
import twitter from "../../Assets/favicon/twitter.svg";
import discord from "../../Assets/favicon/discord.svg";
import instagram from "../../Assets/favicon/instagram.svg";
import tiktok from "../../Assets/favicon/tiktok.svg";
import "react-markdown-editor-lite/lib/index.css";
import "./EachPost.css";
import ReactPaginate from "react-paginate";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopStories from "./TopStories";
import CommentsS from "../../Shared/Comments/CommentsS";
import { useSelector } from "react-redux";
function EachPostC({ articleData }) {
    const { title } = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const user = useSelector((state) => state.user?.user?._id);
    const [isLikedList, setIsLikedList] = useState(null);
    const [shareUrl, setShareUrl] = useState("");
    const [body, setBody] = useState("");

    const [idOfPost, setIdOfPost] = useState("");
    const [sortState, setSortState] = useState("recent");

    const [activeSort, setActiveSort] = useState(sortState);
    const [fetchedData, setFetchedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(null ?? 1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(null ?? 1);
    const [limit, setLimit] = useState(20);
    const mdParser = new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
        underline: true,
        highlight: null,
    });

    useEffect(() => {
        // Filter the articleData array to find the article that matches the title in the params
        const article = articleData.find((article) => article.title === title);

        if (article) {
            // If an article is found, update the `data` state
            setData(article);
            setBody(article.body); // Assuming the body of the article is in the `body` property
            setShareUrl(window.location.href); // Update the share URL
        } else {
            // If no article is found, you can set the `data` state to null or handle it as you see fit
            setData(null);
        }
    }, [articleData, title]); 

    const shareOnInstagram = () => {
        // Construct the Instagram share URL
        const instagramUrl = `https://www.instagram.com/sharer.php?u=${encodeURIComponent(
            shareUrl
        )}`;
        window.open(instagramUrl, "_blank");
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
            // const updatedLikedList = response.data.post.likedList;
            // setIsLikedList(updatedLikedList);

            // // Update isLiked based on whether the current user is in the likedList
            // const liked = updatedLikedList.includes(user);
            // setIsLiked(liked);

            if (response.data.message === "Liked post") {
                setIsLiked(true);
                data.likes += 1;
            } else {
                setIsLiked(false);
                data.likes -= 1;
            }
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
    console.log("userss", data);

    const handlePageClick = (e) => {
        const newPage = e.selected + 1;
        setCurrentPage((prevPage) =>
            prevPage !== newPage ? newPage : prevPage
        );
    };

    const createdAtDate = new Date(data.createdAt);

    return (
        <div className="flex   flex-col justify-center items-center align-middle bg-transparent mx-auto w-full  md:w-1/2 ">
            {isLoading ? (
                <Stack direction="row" spacing={4}>
                    <Spinner size="xl" />
                </Stack>
            ) : data ? (
                <div className="w-full px-4 md:px-24  mx-auto md:mb-24">
                    <div className="relative mx-auto     ">
                        <img
                            src={data.img}
                            alt="coverimage"
                            className="  md:h-[600px] h-[300px] mx-auto w-full object-cover  mb-4 md:mb-24 z-10  "
                        />
                        <div className="md:absolute bottom-0 z-30 px-2 md:px-24  left-0 ">
                            <div className="flex gap-5 align-middle items-center   mb-5">
                                <h5
                                    className="image__text md:text-xl  text-md"
                                    style={{
                                        fontFamily:
                                            '"AkiraExpanded", sans-serif',
                                    }}
                                >
                                    {createdAtDate.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </h5>
                            </div>
                            <h1 className="image__text  font-bold md:text-[60px] md:mb-[40px]  md:leading-[80px] text-[20px]   leading-[20px] ">
                                {data.title}
                            </h1>
                        </div>
                    </div>

                    {data.body?.length > 0 && (
                        <ReactMarkdown
                            className="gap-10 my-5 markdown-container px-2 sm:px-6 md:px-10 lg:[130px] xl:px-[200px]"
                            remarkPlugins={[
                                remarkGfm,
                                remarkParse,
                                remarkRehype,
                            ]}
                            children={body}
                        />
                    )}
                    <div className="flex flex-col items-center align-middle   mx-auto top-[50%] w-fit right-[-20px] md:fixed gap-10 md:p-10">
                        <div className="flex  md:flex-col gap-4 mt-4     items-center align-middle z-50">
                            {" "}
                            <h3 className="text-[12px] md:text-[16px]">
                                SHARE
                            </h3>
                            <a href="">
                                {" "}
                                <img src={discord} alt="discord" />
                            </a>
                            <TwitterShareButton url={shareUrl} title={title}>
                                <img src={twitter} alt="twitter" />
                            </TwitterShareButton>
                            <a href="" onClick={shareOnInstagram}>
                                <img src={instagram} alt="instagram" />
                            </a>{" "}
                            <a href="">
                                {" "}
                                <img src={tiktok} alt="tiktok" />
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center  mx-auto ">
                    {" "}
                    <h1 className="text-center py-[100px]">
                        This post does not exist!
                    </h1>
                </div>
            )}{" "}
        </div>
    );
}

export default EachPostC;

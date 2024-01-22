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
function EachPostC() {
    const { route } = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const user = useSelector((state) => state.user?.user?._id);
    const [isLikedList, setIsLikedList] = useState(null);
    const [shareUrl, setShareUrl] = useState("");
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
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
    useEffect(() => {
        const isLikedByUser = data.likedList?.includes(user);
        setIsLiked(isLikedByUser);
    }, [data, user]);

    useEffect(() => {
        const getAllPostsAndComments = async () => {
            setIsLoading(true);

            // Fetch posts based on route
            const postsResponse = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}/post/getEachPost/${route}`
            );

            // Set posts data
            setShareUrl(window.location.href);
            setBody(postsResponse.data.post.body);
            setTitle(postsResponse.data.post.title);
            setIdOfPost(postsResponse.data.post.id);
            setData(postsResponse.data.post);

            let url = `${process.env.REACT_APP_API_ENDPOINT}/commentPost/getCommentsForPost/${postsResponse.data.post.id}`;
            let sortByParam = "createdAt";
            let sortOrderParam = "desc";

            if (sortState === "popular") {
                // Set parameters for popular sorting
                sortByParam = "viewsOnPost"; // Change this to the appropriate field
                sortOrderParam = "desc"; // Change this to "asc" if needed
            }
            const commentsResponse = await axios.get(url, {
                params: {
                    page: currentPage || 1,
                    limit: limit,
                    sortBy: sortByParam,
                    sortOrder: sortOrderParam,
                },
            });
            setActiveSort(sortState);
            setFetchedData(commentsResponse.data?.commentDetails);
            setTotalPages(commentsResponse.data?.commentDetails.totalPages);
            setTotalResults(commentsResponse.data?.commentDetails.totalComments);
            setIsLoading(false);
        };

        getAllPostsAndComments();
    }, [route, sortState,currentPage]);

    const handlePageClick = (e) => {
        const newPage = e.selected + 1;
        setCurrentPage((prevPage) =>
            prevPage !== newPage ? newPage : prevPage
        );
    };



    const createdAtDate = new Date(data.createdAt);

    return (
        <div className="flex   flex-col justify-center items-center align-middle bg-transparent mx-auto  w-full ">
            {isLoading ? (
                <Stack direction="row" spacing={4}>
                    <Spinner size="xl" />
                </Stack>
            ) : data ? (
                <div className="w-full px-4 md:px-24  mx-auto md:mb-24">
                    <div className="relative mx-auto     ">
                        <img
                            src={data.cover_photo}
                            alt="coverimage"
                            className="  md:h-[600px] h-[300px] mx-auto w-full object-cover  mb-4 md:mb-24 z-10  "
                        />
                        <div className="md:absolute bottom-0 z-30 px-2 md:px-24  left-0 ">
                            <div className="flex gap-5 align-middle items-center   mb-5">
                                <h5
                                    style={{
                                        fontFamily:
                                            '"AkiraExpanded", sans-serif',
                                    }}
                                    className=" nftprojects"
                                >
                                    NFT PROJECTS
                                </h5>
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
                                <div>
                                    <h5
                                        className="image__text md:text-xl  text-md"
                                        style={{
                                            fontFamily:
                                                '"AkiraExpanded", sans-serif',
                                        }}
                                    >
                                        <i className="fa-solid fa-heart mr-1"></i>
                                        {data.likes}
                                    </h5>
                                </div>
                                <div>
                                    <h5
                                        className="image__text md:text-xl  text-md"
                                        style={{
                                            fontFamily:
                                                '"AkiraExpanded", sans-serif',
                                        }}
                                    >
                                        <i className="fa-solid fa-comment mr-1"></i>
                                        {fetchedData?.comments?.length}
                                    </h5>
                                </div>
                            </div>
                            <h1 className="image__text  font-bold md:text-[60px] md:mb-[40px]  md:leading-[80px] text-[20px]   leading-[20px] ">
                                {data.title}
                            </h1>
                        </div>
                    </div>

                    {/* <div className="flex justify-between items-center align-middle  mb-5">
                        <h1 className="text-center font-semi-bold text-[20px] ">
                            {data.caption}
                        </h1>
                    </div> */}

                    {/* <div className="flex gap-4 mb-[100px]">
                        {data.tags &&
                            data.tags.map((item, index) => (
                                <HStack spacing={4}>
                                    <Tag
                                        size={"lg"}
                                        key={index}
                                        borderRadius="full"
                                        variant="solid"
                                        paddingBottom="2px"
                                        colorScheme="blue"
                                    >
                                        <TagLabel>#{item}</TagLabel>
                                    </Tag>
                                </HStack>
                            ))}
                    </div> */}

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
                    <div>
                        <h1
                            className="text-center pt-[100px] flex gap-2 justify-center cursor-pointer"
                            onClick={() => handleLike(data.id)}
                        >
                            {isLiked ? (
                                <i class="fa-solid fa-thumbs-up"></i>
                            ) : (
                                <i class="fa-regular fa-thumbs-up"></i>
                            )}
                            {data?.likes}
                        </h1>
                        <h3 className="text-center mt-4">
                            {isLiked
                                ? " You've liked this post"
                                : " You've yet to like this post"}
                        </h3>
                    </div>
                    <CommentsS
                        idOfPost={idOfPost}
                        currentPage={currentPage}
                        fetchedData={fetchedData}
                        setFetchedData={setFetchedData}
                        handlePageClick={handlePageClick}
                        totalPages={totalPages}
                        totalResults={totalResults}
                    />
                </div>
            ) : (
                <div className="text-center  mx-auto ">
                    {" "}
                    <h1 className="text-center py-[100px]">
                        This post does not exist!
                    </h1>
                </div>
            )}{" "}
            <TopStories />
        </div>
    );
}

export default EachPostC;

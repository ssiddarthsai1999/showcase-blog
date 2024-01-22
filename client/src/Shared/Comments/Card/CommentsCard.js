import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
    faPen,
    faTrash,
    faArrowRight,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
function CommentsCard({
    fetchedData,
    idOfPost,
    setFetchedData,
    handlePageClick,
    currentPage,
    totalPages,
    totalResults,
}) {
    const [content, setContent] = useState("");
    const { user } = useSelector((state) => state.user);
    const userId = user?._id;
    const addComment = async () => {
        try {
            const profileData = JSON.parse(localStorage.getItem("profile"));
            const userToken = profileData?.token;
            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/commentPost/addComment/${idOfPost}`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
     setFetchedData((prevData) => ({
         ...prevData,
         comments: [...prevData.comments, response.data.comment],
     }));

            setContent("");
        } catch (error) {
            console.log(error);
        }
    };
console.log("fetchedData", fetchedData);
    const deleteComment = async (commentId) => {
        try {
            const profileData = JSON.parse(localStorage.getItem("profile"));
            const userToken = profileData?.token;

            await axios.delete(
                `${process.env.REACT_APP_API_ENDPOINT}/commentPost/deleteComment/${idOfPost}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                    data: { commentId }, // Send commentId in the request body
                }
            );

            // Update your state to remove the deleted comment
             setFetchedData((prevData) => ({
                 ...prevData,
                 comments: [...prevData.comments.filter((x)=>x.id!==commentId)],
             }));
            toast.success("Comment deleted successfully!", {
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
            toast.error(error.response, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(error);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        const formattedDate = date.toLocaleDateString("en-US", options);
        const period = date.getHours() >= 12 ? "pm" : "am";
        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
        });

        return `${formattedDate}, ${formattedTime}`;
    };
 
        console.log("currentPage", currentPage);
    return (
        <div className="   w-full bg-[#131517] rounded-lg shadow-xl  ">
            {fetchedData &&
                fetchedData.comments?.length > 0 &&
                fetchedData.comments.map((item) => (
                    <div
                        className=" flex justify-between  items-center border-[#3fffff] border-b w-[90%] mx-auto"
                        key={item.id}
                    >
                        <div className="p-10  flex gap-3 ">
                            <div>
                                <img
                                    className="w-10 rounded-full"
                                    src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <div className="flex gap-4">
                                    <p>{item?.user?.email}</p>
                                    <p>{formatDate(item?.createdAt)}</p>
                                </div>
                                <div className="mt-3">
                                    <p>{item?.content}</p>
                                </div>
                            </div>
                        </div>
                        {userId?.toString() === item?.user?._id?.toString() && (
                            <div className="px-4">
                                <button
                                    className=""
                                    onClick={() => deleteComment(item.id)}
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        )}
                    </div>
                ))}

            {fetchedData.comments === 0 && (
                <div className="sm:p-10 p-2 ">
                    <h2 className="text-center">Be the first to comment!</h2>
                </div>
            )}

            <div className="p-4 mt-[40px] sticky bottom-0 bg-black max-h-[200px]">
                <div className="flex justify-between relative gap-10 items-center">
                    <div className="flex  gap-4 w-full">
                        <img
                            className="w-10 max-w-10 max-h-10 rounded-full "
                            src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                            alt=""
                        />
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            type="text"
                            placeholder={`Comment as ${user?.email}...`}
                            className="w-full bg-transparent border border-gray-700 text-white p-3 rounded-lg outline-none  "
                        />
                    </div>
                    <button
                        className="border border-white px-4 py-1 "
                        onClick={addComment}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <ReactPaginate
                className="flex gap-7 mx-auto justify-center items-center my-10 p-10 "
                activeClassName={"text-blue-500 "}
                activeLinkClassName={" bg-gray-800  px-3 py-1 text-[12px]"}
                initialPage={parseInt(currentPage) - 1}
                breakClassName={"item break-me "}
                breakLabel={"..."}
                containerClassName={"pagination "}
                disabledClassName={"disabled-page "}
                marginPagesDisplayed={2}
                pageLinkClassName={" bg-black  px-3 py-1 text-[12px]"}
                nextClassName={"item next "}
                nextLabel={
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: "#ffffff" }}
                    />
                }
                onPageChange={handlePageClick}
                pageCount={totalPages}
                pageClassName={"item pagination-page "}
                pageRangeDisplayed={2} // Increase the range value here
                previousClassName={"item previous "}
                previousLabel={
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        style={{ color: "#ffffff" }}
                    />
                }
            />
        </div>
    );
}

export default CommentsCard;

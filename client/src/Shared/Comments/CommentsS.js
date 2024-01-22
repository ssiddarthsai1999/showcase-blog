import React, { useEffect, useState } from "react";
import CommentsCard from "./Card/CommentsCard";
import axios from "axios";
import {
    faPen,
    faTrash,
    faArrowRight,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function CommentsS({
    idOfPost,
    fetchedData,
    setFetchedData,
    handlePageClick,
    totalPages,
    currentPage,
    totalResults,
}) {
    return (
        <div className="max-w-[1200px] mx-auto justify-center 0 align-middle items-center py-24 ">
            <h1 className="text-center py-[100px]">
                Comments ({fetchedData?.comments?.length})
            </h1>
            <CommentsCard
                fetchedData={fetchedData}
                idOfPost={idOfPost}
                setFetchedData={setFetchedData}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
                totalPages={totalPages}
                totalResults={totalResults}
            />
        </div>
    );
}

export default CommentsS;

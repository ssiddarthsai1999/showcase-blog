import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Spinner, Stack } from "@chakra-ui/react";
import {
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    VStack,
    HStack,
    Text,
} from "@chakra-ui/react";
import {
    faPen,
    faTrash,
    faArrowRight,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function TldrCard({
    data,
    isLoading,
    currentPage,
    setCurrentPage,
    isError,
    totalPages,
}) {
    const handlePageClick = (e) => {
        const newPage = e.selected + 1;
        setCurrentPage((prevPage) =>
            prevPage !== newPage ? newPage : prevPage
        );
    };
    console.log("isError", isError);

    return (
        <div>
            <div className="relative flex flex-wrap gap-10 w-full h-fit z-0 py-1 md:py-10 md:p-2   ">
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
                        {data.posts.map((item, pageIndex) => (
                            <div
                                key={pageIndex}
                                className="flex  mb-10 mx-auto  md:gap-24 allPostCardBg w-[150px] sm:[300px] md:w-[500px] lg:w-[700px] h-full  gap-10 shadow-xl  duration-100 ease-in border border-transparent hover:border-[#41FFFF]"
                            >
                                <Link
                                    to={`/projects/${item.route}`}
                                    className=" h-full w-full"
                                >
                                    {/*    //leftbox*/}
                                    <div
                                        key={item.id}
                                        className="flex flex-col md:flex-row w-full  "
                                    >
                                        <div className=" max-w-full w-full md:w-[150px]  lg:w-[250px] ">
                                            <img
                                                src={item.cover_photo}
                                                alt=""
                                                className=" w-full h-[100px] lg:h-[250px] lg:min-w-[250px] md:h-[150px] md:max-h-[150px] lg:w-[250px] md:min-w-[150px] md:w-[150px] min-h-full object-cover  bg-center"
                                            />
                                        </div>
                                        {/*    //rightbox*/}
                                        <div className="justify-center items-start min-h-full h-full flex flex-col p-3  md:p-10 w-full gap-2   ">
                                            <div className="flex gap-3 items-center  md:pt-2  ">
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
                                                className="text-left text-white text-[12px] md:text-[20px] font-[700] leading-[20px] md:leading-[30px]"
                                                style={{
                                                    fontFamily: "eurostile",
                                                }}
                                            >
                                                {item.title.slice(0, 35)}{" "}
                                                {item.title.length > 35 &&
                                                    "..."}
                                            </h3>

                                            <h3
                                                className="text-left text-[#FFFFFFC9] text-[8px] md:text-[18px] font-[400] leading-[30px]"
                                                style={{
                                                    fontFamily:
                                                        "SFPRODISPLAYREGULAR",
                                                }}
                                            >
                                                {item.caption.slice(0, 100)}{" "}
                                                {item.caption.length > 100 &&
                                                    "..."}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center mx-auto">
                    {isError &&
                        <h1 className="text-center py-[100px]">
                            There are no posts to render!
                        </h1>}
                    </div>
                )}
            </div>
            <ReactPaginate
                className="flex gap-7 mx-auto justify-center items-center mt-10 "
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

export default TldrCard;

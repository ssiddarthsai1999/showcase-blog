import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import AllPostsCard from "../Post/Cards/AllPostsCard";

import TldrCard from "./card/TldrCard";

function TldrC() {
    const [data, setData] = useState([]);
        const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sortState, setSortState] = useState("recent");
    const [activeSort, setActiveSort] = useState(sortState);
    const [currentPage, setCurrentPage] = useState(null ?? 1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalResults, setTotalResults] = useState(0);
    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true);
            try {
                let url = `${process.env.REACT_APP_API_ENDPOINT}/post/getAllPostsForCategory`;

                const response = await axios.get(url, {
                    params: {
                        page: currentPage || 1,
                        limit: limit,
                        sortBy: "createdAt",
                        sortOrder: "desc",
                        category: "TLDR",
                    },
                });

                setIsLoading(false);
                setTotalResults(response.data.totalPosts);
                setTotalPages(response.data.totalPages);
                setData(response.data);
                console.log(response.data, "response");
            } catch (error) {
                        setIsLoading(false);
                setIsError(error.response.data)
                console.error("Error fetching posts:", error);
            }
        };

        getAllPosts();
    }, [currentPage]);
    console.log("isError", isError);

    return (
        <div>
            <TldrCard
                data={data}
                isLoading={isLoading}
                currentPage={currentPage}
                isError={isError}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default TldrC;

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import AllPostsCard from "../Post/Cards/AllPostsCard";
import AnalysisCard from "./card/AnalysisCard";

function AnalysisC() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
          const [isError, setIsError] = useState(null);
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
                        category: "ANALYSIS",
                    },
                });

                setIsLoading(false);
                setTotalResults(response.data.totalPosts);
                setTotalPages(response.data.totalPages);
                setData(response.data);
                console.log(response.data, "response");
            } catch (error) {
                   setIsLoading(false);
                             setIsError(error.response.data);
                console.error("Error fetching posts:", error);
            }
        };

        getAllPosts();
    }, [currentPage]);
    console.log("data", data);

    return (
        <div>
            <AnalysisCard
                data={data}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                isError={isError}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default AnalysisC;

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import ReactPaginate from "react-paginate";
import axios from "axios";
import { Skeleton, Box } from "@chakra-ui/react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import {
    faPen,
    faTrash,
    faArrowRight,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SubscribersTable() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(null ?? 1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalResults, setTotalResults] = useState(0);
    const onClose = () => setIsOpen(false);

    const cancelRef = useRef();
    function formatCreatedAtDate(createdAt) {
        const dateObject = new Date(createdAt);
        const day = dateObject.toLocaleString("en-US", { day: "numeric" });
        const month = dateObject.toLocaleString("en-US", { month: "short" });
        const year = dateObject.toLocaleString("en-US", { year: "numeric" });
        const time = dateObject.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        });

        return `${day} ${month} ${year}, ${time}`;
    }

    useEffect(() => {
        const getAllSubs = async () => {
            setIsLoading(true);
            try {
                let url = `${process.env.REACT_APP_API_ENDPOINT}/subscribe/getAllSubscribers`;

                const response = await axios.get(url, {
                    params: {
                        page: currentPage || 1,
                        limit: limit,
                    },
                });

                setIsLoading(false);
                setTotalResults(response.data.subscribers.totalSubs);
                setTotalPages(response.data.subscribers.totalPages);
                setData(response.data.subscribers.subs);
                console.log(response.data, "response");
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getAllSubs();
    }, [currentPage]);

    console.log("data", data);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });

        saveAs(blob, "subscribers.xlsx");
    };

    const deletePost = async (id) => {
        // Ask for confirmation before deleting the post

        setIsOpen(true);
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_ENDPOINT}/post/deleteEachPost`,
                {
                    data: { id }, // Pass the post ID in the request body
                }
            );

            // Check the response and update your data accordingly
            if (response.status === 200) {
                // Update data by removing the deleted post
                setData((prevData) =>
                    prevData.filter((item) => item._id !== id)
                );
            }
            toast.success("Post deleted successfully!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            onClose();
            console.log(response.data.message);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const updatePost = (id) => {
        navigate(`/admin/editpost/${id}`);
    };

    const handlePageClick = (e) => {
        const newPage = e.selected + 1;
        setCurrentPage((prevPage) =>
            prevPage !== newPage ? newPage : prevPage
        );
    };

    console.log("currentPage", currentPage);

    return (
        <div className="adminTableBg p-4 ">
            {isLoading ? (
                <Box padding="6" boxShadow="lg" display="flex">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <Box key={index} marginEnd="4" mt="4">
                            <Skeleton h="50px" />
                        </Box>
                    ))}
                </Box>
            ) : (
                <div>
                    <Button className="mb-4" onClick={exportToExcel}>
                        Download Emails
                    </Button>
                    <table className="w-full border-collapse ">
                        <thead className=" adminTableHead ">
                            <tr>
                                <th className="p-2  border-[#104545] "></th>
                                <th className="p-2  border-[#104545] text-left pl-5">
                                    Date
                                </th>
                                <th className="p-2  border-[#104545] text-left pl-5">
                                    Email
                                </th>
                                {/* <th className="p-2  border-[#104545] ">Action</th> */}
                            </tr>
                        </thead>
                        {data?.length > 0 && (
                            <tbody>
                                {data.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-[#104545] border-b"
                                    >
                                        <td className="p-4 border-[#104545] border-b">
                                            {index +
                                                1 +
                                                (currentPage - 1) * limit}
                                        </td>

                                        <td className="p-4 border-[#104545] border-b">
                                            {formatCreatedAtDate(
                                                item.createdAt
                                            )}
                                        </td>
                                        <td className="p-4 border-[#104545] border-b">
                                            <div className="flex items-center">
                                                {/* <Link to={`/posts/${item.id}`}> */}
                                                <p className="cursor-pointer hover:underline">
                                                    {item?.email}
                                                </p>
                                                {/* </Link> */}
                                            </div>
                                        </td>
                                        {/* <td className="p-4 border-[#104545] border-b">
                                        <div className="flex justify-evenly">
                                            <FontAwesomeIcon
                                                className="highlight text-gray-200  hover:text-gray-500 hover:scale-125 ease-in duration-100 cursor-pointer"
                                                icon={faPen}
                                                onClick={() =>
                                                    updatePost(item.id)
                                                }
                                            />
                                            <FontAwesomeIcon
                                                className="highlight text-red-600  hover:text-red-900 hover:scale-125 ease-in duration-100 cursor-pointer"
                                                // style={{
                                                //     color: "red",
                                                //     transition: "red 0.3s ease",
                                                // }}

                                                icon={faTrash}
                                                onClick={() => setIsOpen(true)}
                                            />
                                            <AlertDialog
                                                isOpen={isOpen}
                                                leastDestructiveRef={cancelRef}
                                                onClose={onClose}
                                            >
                                                <AlertDialogOverlay>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader
                                                            className="bg-black border-t border-x"
                                                            fontSize="lg"
                                                            fontWeight="bold"
                                                        >
                                                            Confirm Deletion
                                                        </AlertDialogHeader>

                                                        <AlertDialogBody className="bg-black border-x">
                                                            Are you sure you
                                                            want to delete this
                                                            post?
                                                        </AlertDialogBody>

                                                        <AlertDialogFooter className="bg-black border-x border-b">
                                                            <Button
                                                                ref={cancelRef}
                                                                onClick={
                                                                    onClose
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                colorScheme="red"
                                                                onClick={() =>
                                                                    deletePost(
                                                                        item.id
                                                                    )
                                                                }
                                                                ml={3}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialogOverlay>
                                            </AlertDialog>
                                        </div>
                                    </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            )}
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

export default SubscribersTable;

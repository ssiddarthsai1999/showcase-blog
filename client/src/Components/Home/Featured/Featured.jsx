import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "../../../Assets/icons";

import axios from "axios";
import { Button, Spinner, Stack, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Featured() {
    const [data, setData] = useState({});
    const [calendarData, setCalendarData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/post/getFeaturedPost`
                );

                setIsLoading(false);
                setData(response.data.post);
                console.log(response.data.post);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getAllPosts();
    }, []);

    console.log(data, "data");
    const textSize = useBreakpointValue({ base: "sm", md: "md" });
    return (
        <div className="md:py-[100px] py-[20px]  w-full items-center flex-col flex md:flex-row justify-center mx-auto">
            {isLoading ? (
                <Stack direction="row" spacing={4}>
                    <Spinner size="xl" />
                </Stack>
            ) : (
                data && (
                    <div className="homespan  items-evenly justify-between align-middle  flex-col-reverse  flex md:flex-row gap-4   w-full   ">
                        <div className="w-full md:w-[25%]  p-2 flex flex-col md:gap-10 gap-2 align-middle justify-center  ">
                            {" "}
                            <span className="mb-2"> {`/ featured`}</span>
                            <h1 className="text-[24px] md:text-[40px] md:leading-[45px] mb-2">
                                {data?.title?.slice(0, 100)}
                                {data?.title?.length > 100 && " ..."}
                            </h1>
                            <Link to={`/projects/${data.route}`}>
                                <Button
                                    bg="transparent"
                                    textColor={"white"}
                                    borderRadius={"0px"}
                                    lineHeight={"19px"}
                                    fontWeight={400}
                                    fontSize={"12px"}
                                    leftIcon={<ArrowUpRight />}
                                    border={"1px solid white"}
                                    _hover={{
                                        bg: "gray",
                                        leftIcon: { filter: "brightness(80%)" },
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                        <div className="md:w-[75%]  w-full border md:h-[400px] h-[200px]  relative  ">
                            <Link to={`/projects/${data.route}`}>
                                <img
                                    src={data.cover_photo}
                                    alt=""
                                    className="w-full  h-full object-cover   "
                                />
                            </Link>
                            <div className="notched-borderimg  "></div>
                            <div className="notched-border2  "></div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Featured;

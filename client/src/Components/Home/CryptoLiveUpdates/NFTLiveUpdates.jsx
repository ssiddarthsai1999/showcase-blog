import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CryptoLiveUpdates.css";
import { Link } from "react-router-dom";

const NFTLiveUpdates = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [statsData, setStatsData] = useState([]);

    const collections = [
        "pixelmongen1",
        "pudgypenguins",
        "degods",
        "mocaverse",
        "boredapeyachtclub",
        "azuki",
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionPromises = collections.map(
                    async (collection) => {
                        const response = await axios.get(
                            `https://api.opensea.io/api/v2/collections/${collection}`,
                            {
                                headers: {
                                    accept: "application/json",
                                    "x-api-key":
                                        process.env.REACT_APP_OPENSEA_API_KEY,
                                },
                            }
                        );
                        return response.data;
                    }
                );

                const statsPromises = collections.map(async (collection) => {
                    const statsResponse = await axios.get(
                        `https://api.opensea.io/api/v2/collections/${collection}/stats`,
                        {
                            headers: {
                                accept: "application/json",
                                "x-api-key":
                                    process.env.REACT_APP_OPENSEA_API_KEY,
                            },
                        }
                    );
                    return statsResponse.data;
                });

                const collectionData = await Promise.all(collectionPromises);
                setCryptoData(collectionData); // Duplicate the data

                const statsDataArray = await Promise.all(statsPromises);
                setStatsData([...statsDataArray, ...statsData]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="horizontal-carousel cryptoCardBorder p-4">
            <div className="carousel-container">
                <div className="carousel-track flex">
                    {Array.from({ length: 10 }).map((iteration) => (
                        <div
                            key={iteration}
                            className="carousel-item gap-10 justify-center flex items-center"
                        >
                            {cryptoData.map((item, index) => (
                                <Link
                                    target="_blank"
                                    to={`https://opensea.io/collection/${item?.collection}`}
                                >
                                    <div
                                        key={
                                            index +
                                            iteration * cryptoData.length
                                        }
                                        className="carousel-item hover:underline gap-2 justify-center flex items-center "
                                    >
                                        <img
                                            src={item?.image_url}
                                            alt={`companies ${index + 1}`}
                                            width={30}
                                            height={30}
                                        />
                                        <h3 className="text-[12px] md:text-[20px]">
                                            {item?.collection?.toUpperCase() ===
                                            "BOREDAPEYACHTCLUB"
                                                ? "BAYC"
                                                : item?.collection?.toUpperCase() ===
                                                  "PIXELMONGEN1"
                                                ? "PIXELMON"
                                                : item?.collection?.toUpperCase()}
                                        </h3>
                                        {/* Uncomment this part if you want to include statsData */}
                                        <h3 className="text-[14px] md:text-[20px]">
                                            {
                                                statsData[index]?.total
                                                    ?.floor_price
                                            }{" "}
                                            <span className="text-gray-300 font-light mr-3 pr-3 border-r-2 border-white/40">
                                                {
                                                    statsData[index]?.total
                                                        ?.floor_price_symbol
                                                }
                                            </span>
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NFTLiveUpdates;

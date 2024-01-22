import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CryptoLiveUpdates.css"

const CryptoLiveUpdates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "usd",
                            order: "market_cap_desc",
                            per_page: 10,
                            page: 1,
                            sparkline: false,
                            price_change_percentage: "24h",
                        },
                    }
                );

                setCryptoData(response.data);
                console.log("cryptoData", cryptoData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // The empty dependency array ensures this effect runs only once on component mount

    return (
        <div className="horizontal-carousel cryptoCardBorder p-4">
            <div className="carousel-container">
                <div className="carousel-track flex">
                    {cryptoData.map((item, index) => (
                        <div
                            key={index}
                            className="carousel-item gap-2 justify-center flex items-center"
                        >
                            <img
                                src={item.image}
                                alt={`companies ${index + 1}`}
                                width={30}
                                height={30}
                            />
                            <h3>{item.symbol.toUpperCase()}</h3>
                            <h3>${item.current_price}</h3>
                            <h3
                                className={`pr-3 border-r-2 border-white ${
                                    item.price_change_percentage_24h >= 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {item.price_change_percentage_24h.toFixed(1)}%
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CryptoLiveUpdates;

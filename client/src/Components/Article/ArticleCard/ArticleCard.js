import React from "react";
import "./articleCard.css"
import { Link } from "react-router-dom";
function ArticleCard({ articleData }) {
    return (
        <div className="md:py10 py-10 flex flex-row gap-10 flex-wrap   justify-center">
            {articleData.map((item, index) => (
                <div
                    className="max-w-sm border border-[#4815df]/20  shadow-lg justify-between flex flex-col rounded-[24px] "
                    key={index}
                >
                    <Link to={`/destinations/${item.title}`}>
                        <img
                            className="w-full h-[300px] object-cover rounded-t-[24px] border-0 hover:scale-95 ease-in duration-100"
                            src={item.img}
                            alt="cardPhoto"
                        />
                    </Link>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            {item.title}
                        </div>

                        <div className="flex items-center align-middle mt-2  justify-between">
                            <p className="text-gray-700 text-base">
                                By: {item.author}
                            </p>
                            <span className="text-sm text-gray-600">
                                {item.createdAt}
                            </span>
                        </div>
                        <p className="text-gray-700 text-base mt-4">
                            {item.caption}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <Link to={`/destinations/${item.title}`}>
                            <button className="  font-bold py-2 px-4 rounded w-full button1 cursor-pointer">
                                Read Post
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ArticleCard;

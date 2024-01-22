import { useState } from "react";

export default function ExploreCard({ data }) {
    const [isHover, setIsHover] = useState(false);
    return (
        <div className="text-white flex gap-10 flex-wrap pt-[50px]  md:pt-[100px] justify-center items-center">
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`flex cursor-pointer relative w-[400px] h-[400px] border-transparent border rounded-full   hover:scale-105 ease-in duration-100`}
                    onMouseEnter={() => setIsHover(index)}
                    onMouseLeave={() => setIsHover(null)}
                >
                    <img
                        src={item.image}
                        alt="im"
                        className="w-full h-full  rounded-full   hover:border-[#4815df]"
                    />
                    {isHover === index && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-[#4815df] text-center p-4 duration-100 ease-in drop-shadow-2xl">
                                {item.country}
                            </h1>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

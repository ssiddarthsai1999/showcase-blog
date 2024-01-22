import React from "react";

const TestimonialCard = ({ testimonials }) => {
    return (
        <div className="gap-10 flex flex-row flex-wrap">
            {testimonials.map((item) => (
                <div className="mx-auto bg-transparent border border-[#4815df]  rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
                    <div className="p-8">
                        <div className="flex items-center">
                            <img
                                className="h-16 w-16 rounded-full mr-4 object-cover object-top"
                                src={item.imageSrc}
                                alt={"name"}
                            />
                            <div className="text-sm">
                                <h6 className=" leading-none mb-1">{item.name}</h6>
                                <p className="">{item.title}</p>
                            </div>
                        </div>
                        <p className="mt-4">
                            <p className="text-lg ">{item.quote}</p>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TestimonialCard;

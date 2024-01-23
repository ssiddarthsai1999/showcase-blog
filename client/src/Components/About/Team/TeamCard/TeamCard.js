import React from "react";

const TeamCard = ({ name, position, imageUrl, socialLinks }) => {
    return (
        <div className="mb-6 lg:mb-0 ">
            <div className="block rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]   border border-[#4815df]">
                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                        src={imageUrl}
                        className="w-full rounded-t-lg max-h-[400px] object-cover object-top"
                    />
                    <a href="#!">
                        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed cursor-default"></div>
                    </a>
                    {/* SVG and other static parts can remain as is */}
                </div>
                <div className="p-6">
                    <h5 className="mb-4 text-lg font-bold">{name}</h5>
                    <p className="mb-4  ">{position}</p>
                    <ul className="mx-auto flex list-inside justify-center">
                        {socialLinks.map((link, index) => (
                            <a key={index} href={link.url} className="px-2">
                                {link.icon}{" "}
                                {/* Assuming icon is a component or an svg element */}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;

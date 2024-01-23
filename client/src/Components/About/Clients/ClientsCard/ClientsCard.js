import React from "react";

const ClientsCard = ({ name, logoUrl, websiteUrl }) => {
    return (
        <a
            href={websiteUrl}
            className="flex justify-center cursor-default items-center  border-solid border border-[#4815df] shadow-sm h-24 rounded-2xl hover:bg-[#4815df] ease-in duration-100"
        >
            <img src={logoUrl} alt={name} className="h-9" />
        </a>
    );
};

export default ClientsCard;

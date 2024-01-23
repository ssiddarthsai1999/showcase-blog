import React from "react";
import TeamC from "./Team/TeamC";
import ClientsC from "./Clients/ClientsC";

function AboutC() {
    return (
        <div>
            <div className="max-w-full w-full mx-auto  ">
                <div className=" max-w-full md:max-w-[90%] w-full md:px-24 px-4 md:py-10 py-10  md:mt-24 mt-10   mx-auto">
                    <TeamC />
                </div>
                <div className="max-w-full md:max-w-[90%] w-full md:px-24 px-4 md:py-10 py-10  md:mt-24 mt-10   mx-auto">
                    <ClientsC />
                </div>
            </div>
        </div>
    );
}

export default AboutC;

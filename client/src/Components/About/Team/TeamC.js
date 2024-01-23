import React from "react";
import "../../../typography.css";
import newyork from "../../../Assets/staticassets/newyork.jpg";
import TeamCard from "./TeamCard/TeamCard";

function TeamC() {
    const teamMembers = [
        {
            name: "Maria Smith",
            position: "Frontend Developer",
            imageUrl:
                "https://images.squarespace-cdn.com/content/v1/5ec689480cc22c2d441e152f/860c688d-2c34-4d3f-b58c-23eed26a839b/corporate-headshots-professional-photography-connecticut-ct-photo-studio-dress.jpg",
            socialLinks: [
                // ...other social links
            ],
        },
        {
            name: "John Danger",
            position: "UI/UX Designer",
            imageUrl:
                "https://images.squarespace-cdn.com/content/v1/53b599ebe4b08a2784696956/1585161216625-SPEZ9Q48H4XWEAN47K1O/professional-headshots-nyc-043.jpg",
            socialLinks: [
                // ...other social links
            ],
        },
        {
            name: "Emily Brown",
            position: "Backend Developer",
            imageUrl:
                "https://images.squarespace-cdn.com/content/v1/5fb99ae6fdeafc657921437f/c1682217-738f-4b55-b32d-b286ef9b7118/DSCF0551-Edit.jpg",
            socialLinks: [
                // ...other social links
            ],
        },
        // ...other team members
    ];

    return (
        <div className="flex  mx-auto align-middle justify-evenly  flex-col md:flex-row  w-full items-center">
            <div className="container  mx-auto md:px-6">
                <section className=" text-center">
                    <h2 className="mb-4  font-bold">
                        The Synergy that Drives Our Success
                    </h2>
                    <h3 className="mb-10 md:mb-24"> Meet Our Operational Wizards</h3>
                    <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
                        {teamMembers.map((member, index) => (
                            <TeamCard key={index} {...member} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeamC;

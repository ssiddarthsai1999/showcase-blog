import React from "react";
import "../../../typography.css";

import ClientsCard from "./ClientsCard/ClientsCard";

function ClientsC() {
    const partners = [
        {
            id: 1,
            name: "Skyscanner",
            description:
                "Helps travelers find the best deals on flights and travel packages.",
            logoUrl:
                "https://dpogroup.com/wp-content/uploads/2017/11/skyscanner-scaled.jpeg",
            websiteUrl: "https://www.skyscanner.com",
        },
        {
            id: 2,
            name: "Hopper",
            description:
                "Predicts future flight prices and suggests when to buy for the best value.",
            logoUrl:
                "https://media.designrush.com/inspiration_images/137469/conversions/_1532619420_894_Hopper-Bright-Logo-Design_6e36e5bea3fb-mobile.jpg",
            websiteUrl: "https://www.hopper.com",
        },
        {
            id: 3,
            name: "TripIt",
            description:
                "Integrates all your travel plans into one app and provides real-time updates.",
            logoUrl:
                "https://1ststepaccounting.com/wp-content/uploads/2017/07/tripit-logo.png",
            websiteUrl: "https://www.tripit.com",
        },
        {
            id: 4,
            name: "Airbnb",
            description:
                "Offers unique and authentic accommodation options around the world.",
            logoUrl:
                "https://www.zilliondesigns.com/blog/wp-content/uploads/Airbnb-Logo-Contest.png",
            websiteUrl: "https://www.airbnb.com",
        },
        {
            id: 5,
            name: "Hostelworld",
            description:
                "Connects travelers with budget-friendly hostels in popular destinations.",
            logoUrl:
                "https://www.logo-designer.co/storage/2015/05/Hostelbookers-logo-design-lucky-generals-2.png",
            websiteUrl: "https://www.hostelworld.com",
        },
    ];

    return (
        <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className=" text-center">
                    <h2 className=" text-center mb-4 block">OUR PARTNERS</h2>
                    <h3 className=" text-center font-bold md:mb-24 mb-8">
                        We work with the best partners
                    </h3>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {partners.map((partner) => (
                        <ClientsCard
                            key={partner.id}
                            name={partner.name}
                            logoUrl={partner.logoUrl}
                            websiteUrl={partner.websiteUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ClientsC;

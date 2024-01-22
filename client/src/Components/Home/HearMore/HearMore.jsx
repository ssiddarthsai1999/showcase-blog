import React from "react";
import HearMoreCard from "./card/HearMoreCard";
export default function HearMore() {
    const data = [
        {
            title: "Benjamin Cowen",
            handle: "@intocryptoverse",
            description:
                "#ETH / #BTC still stuck in traffic on struggle street.",
            linkToPost:
                "https://twitter.com/intocryptoverse/status/1744210941019910421",
        },
        {
            title: "Chicken Genius",
            handle: "@pakpakchicken",
            linkToPost:
                "https://twitter.com/pakpakchicken/status/1742534301965828319",
            description:
                "DID YOU SEE THAT NUKE? This means ETF is 100%. I've been telling you. Max fuckery. They will shake both longs and short out to maximise profit. A whip is a more likely scenario before as we climb up. DO NOT BE SHAKEN OUT. HOLD SPOT, NO LEVERAGE. This is PvP. Be on my side. The winning team. I'll ride with you.",
        },
        {
            title: "Alex Becker",
            handle: "@ZssBecker",
            linkToPost:
                "https://twitter.com/ZssBecker/status/1743948073972224053",
            description:
                "The reason the ETF is not a sell the news event is simple.Self custody.Say you’re a retiree, pension fund, financial manager.Most people (including me) don’t feel comfortable self custodying millions (or tens). There’s no way they are just gonna leave their money on say “Coinbase” either.So really what is the option for a normie manager managing multiple clients or an individual to add large amount of bitcoins to their portfolio?The answer is they don’t. This is what the ETF is for. It allows the biggest money holders in the world to actively invest in a way that is comfortable n easy for them.Again no 65 year old with a 10 mil portfolio is gonna self custody 500k in bitcoin.Their manager is not gonna self custody it either, especially not across 20-100 clients each.",
        },
        // {
        //     title: "Kevin Svenson",
        //     handle: "@KevinSvenson_",
        //     description:
        //         "While the masses are distracted by reading the #Epstein Document over the next week, please keep a sharp eye on activities in Washington D.C.They see us as cats chasing a laser pointer.Keep your head on a swivel.#EpsteinFiles #EpsteinList #Doe",
        // },
    ];

    return (
        <div className="md:pb-[50px]  md:pt-[60px] homespan">
            <span className=" ml-[10px] ">{`// whispers`}</span>
            <HearMoreCard data={data} />
        </div>
    );
}

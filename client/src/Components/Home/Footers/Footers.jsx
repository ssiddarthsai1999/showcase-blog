import calibur from "../../../Assets/calibur.svg";
import x from "../../../Assets/x.svg";
import discord from "../../../Assets/favicon/discord.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import twitter from "../../../Assets/favicon/twitter.svg";
import tiktok from "../../../Assets/favicon/tiktok.svg";
import instagram from "../../../Assets/favicon/instagram.svg";
import send from "../../../Assets/favicon/send.svg";
import { useState } from "react";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Footers() {
    const [email, setEmail] = useState();
    const [data, setData] = useState("");

    const handleSubscribe = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/subscribe/createSubscription`,
                { email }
            );
            setData(response.data.message);

            setEmail("");

            toast.success("Subscribed!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast.error(error.response.data, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="w-full p-3 md:p-10  flex bg-black items-center  footerBg ">
            <div className="w-[90%] flex  md:flex-row flex-col mx-auto  justify-between ">
                <div className=" ">
                    <div
                        className="  flex  cursor-pointer"
                        onClick={scrollToTop}
                    >
                        <img src={x} alt="logo" />
                        <img src={calibur} alt="logo" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-4 mt-4   items-center align-middle">
                            {" "}
                            <a href="https://www.byxcalibur.xyz">
                                {" "}
                                <img src={discord} alt="discord" />
                            </a>
                            <a
                                href="https://twitter.com/ByXcalibur"
                                target="blank"
                            >
                                {" "}
                                <img src={twitter} alt="twitter" />
                            </a>
                            <a
                                href="https://www.instagram.com/byxcalibur/"
                                target="blank"
                            >
                                <img src={instagram} alt="instagram" />
                            </a>{" "}
                            {/* <a href="">
                                {" "}
                                <img src={tiktok} alt="tiktok" />
                            </a> */}
                        </div>

                        <h4 className="mt-4 mb-1 text-[16px] flex leading-[19px] font-[400] items-center text-[#FFFFFF61]">
                            <FontAwesomeIcon
                                icon={faCopyright}
                                className="text-[20px] bg-transparent"
                            />
                            <h4 className="ml-2  font-[400]   text-[#FFFFFF61] ">
                                {" "}
                                2023 ByXcalibur. All rights reserved.{" "}
                            </h4>
                        </h4>
                    </div>
                </div>

                <div className="flex flex-col  gap-4   justify-end mt-4 homespan    items-center">
                    <span className=" leading-10 ">{`// get the latest scoop`}</span>
                    <div className="flex  relative  w-full  mt-4 ">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                background:
                                    "rounded-none  linear-gradient(0deg, #0F1012, #0F1012), linear-gradient(117.14deg, rgba(255, 255, 255, 0.4) -11.02%, rgba(255, 255, 255, 0) 119.05%)",
                            }}
                            type="email"
                            placeholder="Email"
                            className="placeholder:text-[12px] rounded-none  pl-5 p-2 text-[8px] md:text-[12px] w-full md:w-[400px] bg-[#0F1012] border border-solid border-[#FFFFFF66] "
                        />

                        <button
                            className="  subscribeButton"
                            onClick={handleSubscribe}
                        >
                            <img
                                alt="send "
                                className="md:w-[14px] w-[8px]"
                                src={send}
                            />{" "}
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

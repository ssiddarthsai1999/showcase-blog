import { useState } from "react";
import discord from "../../../Assets/favicon/discord.svg";
import twitter from "../../../Assets/favicon/twitter.svg";
import instagram from "../../../Assets/favicon/instagram.svg";
import { ToastContainer, toast } from "react-toastify";
import x from "../../../Assets/x.svg";
import calibur from "../../../Assets/calibur.svg";
import send from "../../../Assets/send.svg";
import { Link } from "react-router-dom";
import axios from "axios";
export default function NewsLetter() {
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

    return (
        <div className="my-5 w-full justify-between p-2 md:p-24 flex md:flex-row flex-col bg-black items-center  bgBlue  ">
            <div className="w-full md:w-1/2    ">
                <h2 className="mt-2 md:mt-5 font-[700] text-white leading-[33px] text-[12px] md:text-[28px] mb-2  md:mb-7">
                    Keep up-to-date with weekly insights
                </h2>
                <div className="flex gap-4 mb-5   items-center align-middle">
                    {" "}
                    <a href="https://www.byxcalibur.xyz">
                        {" "}
                        <img src={discord} alt="discord" />
                    </a>
                    <a href="https://twitter.com/ByXcalibur" target="blank">
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
            </div>
            <div className="flex md:w-1/2 gap-3 w-full  justify-end relative">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
          
                    type="email"
                    placeholder="Email"
                    className=" placeholder:text-[12px] placeholder:text-white text-white rounded-[24px] pl-5 p-2 text-[8px] md:text-[12px] w-full md:w-[400px] bg-transparent border border-solid border-[#4815df]"
                />

                <button className="  button1" >
                    Subscribe
                </button>
            </div>
        </div>
    );
}

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
        <footer className="  border-t border-[#4815df]">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-20">
                <div className="xl:grid xl:grid-cols-4 md:grid md:grid-cols-2">
                    {/* Company Information */}
                    <div className="mb-6 md:mb-0">
                        <h5 className="uppercase font-bold mb-2.5">Company</h5>
                        <p className="mb-4">123 Business Ave.</p>
                        <p className="mb-4">Business City, 12345</p>
                        <p className="mb-4">Email: contact@business.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-6 md:mb-0">
                        <h5 className="uppercase font-bold mb-2.5">
                            Quick Links
                        </h5>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:underline">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="mb-6 md:mb-0">
                        <h5 className="uppercase font-bold my-2.5">
                            Follow Us
                        </h5>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook">
                                <i className="fa-brands fa-facebook fa-lg text-[#4815df]"></i>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <i className="fa-brands fa-twitter text-[#4815df] fa-lg"></i>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <i className="text-[#4815df]  fa-brands fa-instagram fa-lg"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="hover:text-gray-400"
                            >
                                {/* SVG or Image for LinkedIn */}
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="mb-6 md:mb-0">
                        <h5 className="uppercase font-bold mb-2.5">
                            Newsletter
                        </h5>
                        <p className="mb-4">
                            Subscribe to our newsletter for the latest updates.
                        </p>
                        <form>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                                className=" placeholder:text-[12px] py-4 rounded-[24px] pl-5 p-2 text-[8px] md:text-[12px] w-full md:w-[400px] bg-transparent border border-solid border-[#4815df]"
                            />
                            <button className="button1 mt-3 ">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center p-4 border-t border-[#4815df] mt-10">
                © {new Date().getFullYear()} ITravelEverywhere. All Rights Reserved.
            </div>
        </footer>
    );
}

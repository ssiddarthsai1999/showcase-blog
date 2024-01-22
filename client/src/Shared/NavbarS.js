import React, { useState, useEffect } from "react";
import logo from "../Assets/aklogo.svg";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import instagram from "../Assets/favicon/instagram.svg";
import discord from "../Assets/favicon/discord.svg";
import twitter from "../Assets/favicon/twitter.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import search from "../../src/Assets/search.svg";
import send from "../../src/Assets/send.svg";
import calibur from "../../src/Assets/calibur.svg";
import x from "../../src/Assets/x.svg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../Redux/Slices/userSlice";
import {
    Menu,
    MenuButton,
    MenuList,
    Button,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from "@chakra-ui/react";
function NavbarS({ handleSubscribe }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(isMenuOpen === false);
    };

    const logoutUser = async () => {
        try {
            await dispatch(setLogout());
            toast.success("Logged out successfully!", {
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
            toast.error("Logout failed. Please try again.", {
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

    const handleSubscribeClick = async () => {
        handleSubscribe(); // Assuming handleSubscribe is doing some async operation
        navigate("/#footer");
    };

    useEffect(() => {}, [user]);
console.log("user",user)
    return (
        <div className="w-full py-10 shadow-xl bg-black">
            <div className="flex justify-between align-middle items-center md:px-24 px-6">
                <Link to="/">
                    <div className="pl-5 flex cursor-pointer ">
                        <img src={x} className="" alt="logo" />
                        <img src={calibur} alt="" />
                    </div>
                </Link>
                <div className="pr-10">
                    {/* Conditionally render the FontAwesome icon for smaller screens */}
                    <div className="lg:hidden">
                        <FontAwesomeIcon
                            icon={faBars}
                            size="lg"
                            className="cursor-pointer relative"
                            onClick={handleMenuOpen}
                        />
                        {isMenuOpen && (
                            <div className="absolute top-0 inset-x-0 bg-black min-h-screen shadow-2xl p-2">
                                <FontAwesomeIcon
                                    onClick={() => setIsMenuOpen(false)}
                                    icon={faX}
                                    className="justify-end ml-auto p-2 flex cursor-pointer "
                                />
                                <ul className="flex flex-col gap-4 font-bold text-[14px] mt-2 text-white">
                                    <Link to="/" onClick={closeMenu}>
                                        <h6 className="text-white text-[12px] lg:text-[18px]">
                                            HOME
                                        </h6>
                                    </Link>
                                    {/* <Link to="/login" onClick={closeMenu}>
                                        <h6 className="text-white text-[12px] lg:text-[18px]">
                                            LOGIN
                                        </h6>
                                    </Link> */}

                                    {/* <Link to="/" onClick={closeMenu}>
                                        {" "}
                                        <h6 className="lg:text-[18px] text-[12px]">
                                            NEWS
                                        </h6>{" "}
                                    </Link> */}
                                    <Link to="/deck" onClick={closeMenu}>
                                        {" "}
                                        <h6 className="lg:text-[18px] text-[12px]">
                                            DECK
                                        </h6>
                                    </Link>
                                    <Link to="/tldr" onClick={closeMenu}>
                                        <h6 className="lg:text-[18px] text-[12px]">
                                            TLDR
                                        </h6>
                                    </Link>
                                    <div className="flex gap-4    items-center align-middle">
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
                                            <img
                                                src={instagram}
                                                alt="instagram"
                                            />
                                        </a>{" "}
                                        {/* <a href="">
                                {" "}
                                <img src={tiktok} alt="tiktok" />
                            </a> */}
                                    </div>
                                    {/* <Link to="/" onClick={closeMenu}>
                                        {" "}
                                        <h6 className="lg:text-[18px] text-[12px]">
                                            ABOUT
                                        </h6>
                                    </Link> */}
                                    <div className="dropdown ">
                                        {user && (
                                            <div>
                                                <Link
                                                    to="/admin/posts"
                                                    onClick={closeMenu}
                                                >
                                                    <h6 className="lg:text-[18px] text-[12px] mb-3">
                                                        ADMIN
                                                    </h6>
                                                </Link>
                                                <h6 className="lg:text-[18px] text-[12px] ">
                                                    {user?.email?.includes("@")
                                                        ? user?.email?.split(
                                                              "@"
                                                          )[0]
                                                        : user?.email}
                                                </h6>
                                                <h6
                                                    onClick={logoutUser}
                                                    className="cursor-pointer text-white className lg:text-[18px] text-[12px] mt-3  "
                                                >
                                                    LOGOUT
                                                </h6>
                                            </div>
                                        )}
                                    </div>
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Conditionally render the navigation links for larger screens */}
                    <ul className="hidden lg:flex gap-4 font-bold text-[18px] align-middle items-center ">
                        <Link to="/">
                            <h6 className="text-white text-[12px] xl:text-[18px] hover:text-white/50 ease-in duration-100">
                                HOME
                            </h6>
                        </Link>

                        {/* <Link to="/">
                            {" "}
                            <h6 className="text-white text-[8px] xl:text-[18px] hover:text-white/50 ease-in duration-100">
                                NEWS
                            </h6>{" "}
                        </Link> */}
                        <Link to="/deck">
                            {" "}
                            <h6 className="text-white text-[12px] xl:text-[18px] hover:text-white/50 ease-in duration-100">
                                DECK
                            </h6>
                        </Link>
                        {/* <Link to="/">
                            <h6 className="text-white text-[8px] xl:text-[18px] hover:text-white/50 ease-in duration-100">
                                SOCIALS
                            </h6>
                        </Link> */}
                        <Link to="/tldr">
                            {" "}
                            <h6 className="text-white text-[12px] xl:text-[18px] hover:text-white/50 ease-in duration-100">
                                TLDR
                            </h6>
                        </Link>

                        <div className="dropdown ">
                            {
                                user ? (
                                    <h6 className="text-white text-[8px] xl:text-[18px]">
                                        {user?.email?.includes("@")
                                            ? user.email.split("@")[0]
                                            : user.email}
                                    </h6>
                                )
                                   : (
                                        <Link to="/login">
                                           <h6 className="text-white text-[12px] lg:text-[18px]">
LOGIN
                                         </h6>
                                </Link>
                                  )
                            }
                   
                            {user && (
                                <div class="dropdown-content">
                                    {user.isAdmin && (
                                        <Link
                                            to="/admin/posts"
                                            className="hover:text-black"
                                        >
                                            <h6 className="hover:text-black">
                                                ADMIN
                                            </h6>
                                        </Link>
                                    )}
                                    <Link to="/profile" className="hover:text-black">
                                        <h6
                                   
                                            className="cursor-pointer text-white hover:text-black "
                                        >
                                            PROFILE
                                        </h6>
                                    </Link>
                                    <Link to="/" className="hover:text-black">
                                        <h6
                                            onClick={logoutUser}
                                            className="cursor-pointer text-white hover:text-black "
                                        >
                                            LOGOUT
                                        </h6>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* <button className="  subscribeButton justify-center xl:text-[12px] text-[8px] ">
                            <img alt="send" src={send} /> Subscribe
                        </button> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavbarS;

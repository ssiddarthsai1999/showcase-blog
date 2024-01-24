import React, { useState, useEffect } from "react";

import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import instagram from "../Assets/favicon/instagram.svg";
import discord from "../Assets/favicon/discord.svg";
import twitter from "../Assets/favicon/twitter.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleTheme } from "../Redux/Slices/themeSlice";
import search from "../../src/Assets/search.svg";
import logo from "../../src/Assets/img/logo.png";
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
    const { mode } = useSelector((state) => state.theme);
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
    console.log("user", user);
    return (
        <div
            className={`w-full py-2 shadow-md ${
                mode === "light" ? "bg-white" : "bg-black"
            } border-b border-[#4815df]`}
        >
            <div className="flex justify-between align-middle items-center md:px-24 px-6">
                <Link to="/">
                    <div className="pl-5 flex cursor-pointer ">
                        <img src={logo} alt="logo" className="w-24" />
                    </div>
                </Link>
                <div className="pr-10">
                    {/* Conditionally render the FontAwesome icon for smaller screens */}
                    <div className="lg:hidden">
                        <i
                            class="fa-solid fa-bars"
                            onClick={handleMenuOpen}
                        ></i>
                        {isMenuOpen && (
                            <div className="fixed top-0 right-0 inset-x-0 bg-black min-h-screen shadow-2xl p-2">
                                <i
                                    className="text-white fa-solid fa-xmark justify-end flex mr-4 mt-3 "
                                    onClick={() => setIsMenuOpen(false)}
                                ></i>
                                <ul className="flex flex-col gap-4 font-bold text-[14px] mt-2 ">
                                    <Link to="/" onClick={closeMenu}>
                                        <h6 className="  text-white">Home</h6>
                                    </Link>

                                    <Link to="/about">
                                        <h6 className="  ease-in duration-100 text-white">
                                            About
                                        </h6>
                                    </Link>
                                    <Link to={`/destinations`}>
                                        <h6 className="  ease-in duration-100 text-white">
                                            Explore
                                        </h6>
                                    </Link>

                                    {/* <div className="dropdown ">
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
                                    </div> */}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Conditionally render the navigation links for larger screens */}
                    <ul className="hidden lg:flex gap-4 font-bold text-[18px] align-middle items-center ">
                        <Link
                            to="/"
                            className=" border-transparent hover:text-[#4815df] hover:border-b hover:border-[#4815df]  duration-100 ease-in"
                        >
                            <h6 className=" text-[12px] xl:text-[18px]  ease-in duration-100">
                                Home
                            </h6>
                        </Link>
                        <Link
                            to="/about"
                            className=" border-transparent hover:text-[#4815df] hover:border-b hover:border-[#4815df]  duration-100 ease-in"
                        >
                            <h6 className=" text-[12px] xl:text-[18px]  ease-in duration-100">
                                About
                            </h6>
                        </Link>
                        <Link
                            to="/destinations"
                            className=" border-transparent hover:text-[#4815df] hover:border-b hover:border-[#4815df]  duration-100 ease-in"
                        >
                            <h6 className=" text-[12px] xl:text-[18px]  ease-in duration-100">
                                Explore
                            </h6>
                        </Link>

                        <button onClick={() => dispatch(toggleTheme())}>
                            {mode === "light" ? (
                                <i className="fa-regular fa-moon hover:text-[#4815df] duration-100 ease-in"></i>
                            ) : (
                                <i className="fa-regular fa-sun hover:text-[#4815df] duration-100 ease-in"></i>
                            )}
                        </button>

                        {/* <div className="dropdown ">
                            {user ? (
                                <h6 className="text-[8px] xl:text-[18px]">
                                    {user?.email?.includes("@")
                                        ? user.email.split("@")[0]
                                        : user.email}
                                </h6>
                            ) : (
                                <Link to="/login">
                                    <h6 className=" text-[12px] lg:text-[18px]">
                                        LOGIN
                                    </h6>
                                </Link>
                            )}

                            {user && (
                                <div class="dropdown-content">
                                    {user.isAdmin && (
                                        <Link to="/admin/posts" className="">
                                            <h6 className="">ADMIN</h6>
                                        </Link>
                                    )}
                                    <Link to="/profile" className="">
                                        <h6 className="cursor-pointer text-white  ">
                                            PROFILE
                                        </h6>
                                    </Link>
                                    <Link to="/" className="">
                                        <h6
                                            onClick={logoutUser}
                                            className="cursor-pointer text-white  "
                                        >
                                            LOGOUT
                                        </h6>
                                    </Link>
                                </div>
                            )}
                        </div> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavbarS;

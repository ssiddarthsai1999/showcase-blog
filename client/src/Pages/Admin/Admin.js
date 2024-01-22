import React, { useState } from "react";
import SideNavbar from "../../Shared/SideNavbar";
import CreatePost from "./CreatePost";
import AllPosts from "../Admin/AllPosts";
function Admin() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("");
    const handleActiveNav = (name) => {
        setActiveNav(name);
        console.log("activeNav", activeNav);
    };
    const handleNavClose = () => {
        setIsNavOpen(false);
    };

    return (
        <div>
            <div className="flex">
                <div className="w-[240px] ">
                    {/* <SideNavbar
                        handleActiveNav={handleActiveNav}
                        activeNav={activeNav}
                        setActiveNav={setActiveNav}
                    /> */}
                </div>

                <div className="flex flex-col w-full  p-10">
                    <h1>Admin</h1>
                    <div className=" w-full mx-auto ">
                        {activeNav === "posts" && <AllPosts />}
                        {activeNav === "createposts" && <CreatePost />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;

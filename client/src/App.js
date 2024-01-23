import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    ChakraProvider,
    extendTheme,
    withDefaultProps,
} from "@chakra-ui/react";
import { AdminRoute } from "./Middleware/AdminRoute";
import { useDispatch } from "react-redux";
import {
    Navigate,
    Route,
    Routes,
    BrowserRouter as Router,
    Outlet,
    Link,
} from "react-router-dom";
import { setUser } from "./Redux/Slices/userSlice";

import NavbarS from "../../client/src/Shared/NavbarS";
import FooterS from "../../client/src/Shared/FooterS";
import Admin from "./Pages/Admin/Admin";
import Login from "./Pages/Auth/Login";
import CreatePost from "./Pages/Admin/CreatePost";
import AllPosts from "./Pages/Post/AllPosts";
import EachPost from "./Pages/Post/EachPost";
import NotFound from "./Shared/NotFound";
import Home from "./Pages/Home/Home";
import SideNavbar from "./Shared/SideNavbar";
import AllPostss from "./Pages/Admin/AllPosts";
import EditPost from "./Pages/Post/EditPost";
import { CacheProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import "../src/Pages/Admin/admin.css";
import Footers from "./Components/Home/Footers/Footers";
import Subscribers from "./Pages/Admin/Subscribers";
import Analysis from "./Pages/Analysis/Analysis";
import createCache from "@emotion/cache";
import Tldr from "./Pages/Tldr/Tldr";
import Register from "./Pages/Auth/Register";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import Profile from "./Pages/Profile/Profile";
import { AuthUserRoute } from "./Middleware/AuthUserRoute";
import ResetPassword from "./Pages/Auth/ResetPassword";
import { toggleTheme } from "./Redux/Slices/themeSlice";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import About from "./Pages/About/About";
import Destinations from "./Pages/Destinations/Destinations";
function App() {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.theme);
    const profile = JSON.parse(localStorage.getItem("profile"));
    const user = profile?.user;
    const adminUser = profile?.user?.isVerified;

    const handleSubscribe = async () => {
        Navigate("/#footer");
    };

    useEffect(() => {
        dispatch(setUser(user));

        // Refresh the page when the user state changes
    }, [user]);

    console.log("mode", mode);
    const googleSecret = "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";
    return (
        <div className={`${mode === "dark" ? "dark-mode" : ""}`}>
            <ToastContainer />
            <Router>
                <Routes>
                    {/*Standard......................*/}
                    <Route
                        element={
                            <div className="scroll-smooth antialiased flex flex-col min-h-screen">
                                <div className="w-full md:sticky top-0 z-40">
                                    <NavbarS
                                        handleSubscribe={handleSubscribe}
                                    />
                                </div>
                                <Outlet />
                                <div className="flex-grow"></div>
                                <div
                                    className="pt-[80px] md:pt-[150px] bottom-0"
                                    id="footer"
                                >
                                    <Footers />
                                </div>
                            </div>
                        }
                    >
                        {/*Auth......................*/}
                        <Route element={<Home />} path="/" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route
                            path="/verifyEmail/:token"
                            element={<VerifyEmail />}
                        />

                        <Route
                            path="/reset-password/:resetToken"
                            element={<ResetPassword />}
                        />
                        {/*Posts......................*/}
                        <Route
                            element={<AllPosts />}
                            path="/projects/allposts"
                        />
                        <Route
                            element={<Destinations />}
                            path="/destinations"
                        />
                        <Route element={<EachPost />} path="/destinations/:title" />
                        {/*Analysis and tldr......................*/}
                        <Route element={<Analysis />} path="/deck" />
                        <Route element={<Tldr />} path="/tldr" />
                        {/*Profile......................*/}
                        <Route
                            element={<AuthUserRoute element={<Profile />} />}
                            path="/profile"
                        />
                    </Route>

                    {/*Admin route......................*/}
                    <Route
                        element={
                            <div className="scroll-smooth antialiased flex  ">
                                {" "}
                                <div className="  md:sticky left-0 w-fit  ">
                                    <SideNavbar />
                                </div>
                                <div className="adminBg w-full mx-auto">
                                    {" "}
                                    <Outlet />
                                </div>
                            </div>
                        }
                    >
                        <Route
                            element={<AdminRoute element={<AllPostss />} />}
                            path="/admin/posts"
                        />
                        <Route
                            element={<AdminRoute element={<CreatePost />} />}
                            path="/admin/createpost"
                        />
                        <Route
                            element={<AdminRoute element={<EditPost />} />}
                            path="/admin/editpost/:id"
                        />
                        <Route
                            element={<AdminRoute element={<Subscribers />} />}
                            path="/admin/subscribers"
                        />
                    </Route>

                    {/*Error 404 not found......................*/}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>{" "}
        </div>
    );
}

export default App;

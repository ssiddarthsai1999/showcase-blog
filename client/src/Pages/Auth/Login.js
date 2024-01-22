import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { loginUser } from "../../Redux/Slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Redux/Slices/userSlice";
function Login() {
    //defining initial state
    const initialState = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialState);
    const { email, password } = initialState;
    const [credentialResponse, setCredentialResponse] = useState(null);
    const [tokenId, setTokenId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user= useSelector((state)=>state.user.user)
    //input change handler
    function handleChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    //handle submit
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginUser({ formValues, navigate, toast }));
        setInterval(() => {}, 2000);
    }

    const responseGoogle = (response) => {
        setTokenId(response.credential);
        const decoded = jwtDecode(response.credential);
        setCredentialResponse(decoded);
    };

    useEffect(() => {
        const profile = localStorage.getItem("profile");
        if (profile) {
            navigate("/");
        }
    }, []);
    useEffect(() => {
        if (credentialResponse) {
            // Assuming credentialResponse contains user data
            const { email, given_name, family_name } = credentialResponse;

            // Create a user object
            const user = {
                token: tokenId,
                email,
                firstName: given_name,
                lastName: family_name,
                // Add other user properties as needed
            };

            // Create a profile object with a nested user object
            const profileWithUser = {
                user,
                // Add other profile properties as needed
            };

            // Update Redux state with the user data
            dispatch(setUser(user));

            // Save both user and profile data in localStorage
            localStorage.setItem("profile", JSON.stringify(profileWithUser));
        }
    }, [credentialResponse, tokenId]);

    // console.log("user", user);
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                className="px-4 block w-full rounded-none border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Password
                            </label>
                            {/* <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                className="px-4 block w-full rounded-none border-0 py-1.5 text-white bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-none bg-[#3fffff] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#3fb2ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <Link to="/register">
                    {" "}
                    <p className="mt-10 text-center text-sm text-white">
                        Not a member? Register here!{" "}
                    </p>
                </Link>
                <GoogleLogin
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={() => console.log("Login Failed")}
                    cookiePolicy={"single_host_origin"}
                />
            </div>
        </div>
    );
}

export default Login;

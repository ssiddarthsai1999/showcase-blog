import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerUser } from "../../Redux/Slices/userSlice";

function Register() {
    //defining initial state
    const initialState = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialState);
    const { email, password } = initialState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //input change handler
    function handleChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        console.log(formValues);
    }
    //handle register
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(registerUser({ formValues, navigate, toast }));
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                /> */}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Register your account
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
                            Register
                        </button>
                    </div>
                </form>
                <Link to="/login">
                    {" "}
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member? Login here!{" "}
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Register;

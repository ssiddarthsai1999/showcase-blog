import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setLogout } from  "../../Redux/Slices/userSlice"
    import { useSelector, useDispatch } from "react-redux";
const ResetPassword = () => {
    const { resetToken } = useParams();
    const [email, setEmail] = useState(null);
    const dispatch = useDispatch();
    const [isVerified, setIsVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/auth/forgotPassword/${resetToken}`
                );
                setIsVerified(true);
                setEmail(response.data);
            } catch (error) {
                console.error("Email verification failed:", error.message);
            }
        };

        if (resetToken) {
            verifyEmail();
        }
    }, [resetToken]);
    console.log("email", email);

    const changePassword = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/auth/forgotPassword/${resetToken}`,
                {
                    newPassword: password,
                    email: "sidducricket45@gmail.com",
                }
            );

            if (response.status === 200) {
                setIsPasswordChanged(true);
                setPassword("");
                toast.success("Password reset successful! Please reglogin with new password", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            await dispatch(setLogout());
                // Start countdown only when password is changed
                if (isPasswordChanged) {
                    const intervalId = setInterval(() => {
                        setCountdown((prevCountdown) => prevCountdown - 1);
                    }, 1000);

                    // Clear the interval when countdown reaches 0
                    if (countdown === 0) {
                        clearInterval(intervalId);
                    }

                    // Clear the interval when component unmounts
                    return () => clearInterval(intervalId);
                }
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Password reset failed",
                {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
            console.error("Reset password failed:", error.message);
        }
    };

    useEffect(() => {
        // Navigate to "/" when countdown reaches 0
        if (countdown === 0) {
            navigate("/login");
        }
    }, [countdown, navigate]);

    return (
        <div className="flex flex-col justify-center items-center  h-screen   w-full">
            {isVerified && (
                <div>
                    <h1>Change your password</h1>
                    <input
                        type="text"
                        placeholder="new-password"
                        className="bg-black"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {isPasswordChanged && (
                        <h3 className="mt-3">
                            Navigating to home in {countdown} seconds
                        </h3>
                    )}
                    <button onClick={changePassword}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;

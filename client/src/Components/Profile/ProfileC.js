import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function ProfileC({ userInfo, email }) {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/auth/forgotPassword`,
                { email }
            );
            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            console.log("Post created:", response.data);
        } catch (error) {
            toast.error("Please try again.", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="w-full bg-slate-600">
            {userInfo ? (
                <div>
                    <div>
                        <img src={userInfo.profilePic} alt="" />
                        <h3>Name:{userInfo.name}</h3>
                        <h3>Email:{userInfo.email}</h3>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>change password</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>Trouble loading data!</h3>
                </div>
            )}
        </div>
    );
}

export default ProfileC;


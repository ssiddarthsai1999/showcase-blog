import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const VerifyEmail = () => {
    const { token } = useParams();
    const [isVerified, setIsVerified] = useState(false);
        const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        const verifyEmail = async () => {
            try {
             const response = await axios.get(
                 `${process.env.REACT_APP_API_ENDPOINT}/auth/verify/${token}`
             );
                setIsVerified(true);
            } catch (error) {
                console.error("Email verification failed:", error.message);
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token]);

useEffect(() => {
    if (isVerified) {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Clear the interval when component unmounts
        return () => clearInterval(intervalId);
    }
}, [isVerified]);


      useEffect(() => {
          // Navigate to "/" when countdown reaches 0
          if (countdown === 0) {
              navigate("/login");
          }
      }, [countdown, navigate]);

    return (
        <div className="flex flex-col justify-center items-center  h-screen   w-full">
            {isVerified ? <h1>Email Verified</h1> : <h1>Verifying Email...</h1>}
            {isVerified && (
                <h3 className="mt-3">
                    Navigating to home in {countdown} seconds
                </h3>
            )}
        </div>
    );
};

export default VerifyEmail;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Clear the interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Navigate to "/" when countdown reaches 0
        if (countdown === 0) {
            navigate("/");
        }
    }, [countdown, navigate]);

    return (
        <div className="notFoundBg flex flex-col items-center align-middle justify-center">
            <h1 className="mb-5">404 Page Not Found</h1>
            <h3>Navigating to home in {countdown} seconds</h3>
        </div>
    );
}

export default NotFound;

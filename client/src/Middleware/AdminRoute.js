import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const AdminRoute = ({ element }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
const token = JSON.parse(localStorage.getItem("profile"))?.token;
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/auth/adminuser`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setUser(response.data.user);
                } else {
                    console.error(
                        "Failed to fetch user data:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    if (loading) {
        // Wait for user data to be fetched
        return null;
    }

    if (!localStorage.getItem("profile")) {
        return <Navigate to="/login" replace />;
    }

    const adminUser = user?.isAdmin;
console.log("token",token)
    if (adminUser) {
        return element;
    } else {
        return <Navigate to="/" replace />;
    }
};

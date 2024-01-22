import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });
//,,,,,,,,,,,,,auth,,,,,,,,,,,,,,,,,,,
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);

export const getusercart = (formData) => API.get("/cart/getusercart", formData);

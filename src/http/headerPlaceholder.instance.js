import axios from "axios";

export const instance = axios.create({baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://enigmatic-spire-58695.herokuapp.com"})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token)
        config.headers = {
            Authorization: "Bearer " + token,
        };
    return config;
});
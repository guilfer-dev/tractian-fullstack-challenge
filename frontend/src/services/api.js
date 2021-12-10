import axios from "axios";
import "dotenv/config";

// define api url
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// intercepts requests and set headers basaed on localstorage
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
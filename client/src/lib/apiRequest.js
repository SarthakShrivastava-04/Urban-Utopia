import axios from "axios";

const apiRequest = axios.create({
    baseURL: process.env.API_BASE_URL || "http://localhost:3000", 
    withCredentials: true,
});

export default apiRequest;

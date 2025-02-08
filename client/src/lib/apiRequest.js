import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://real-estate-backend-2n7i.onrender.com",
    withCredentials: true,
    });

export default apiRequest;

    import axios from "axios";
    import Cookies from "js-cookie";

    const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    headers: { "Content-Type": "application/json" },
    });

    api.interceptors.request.use((config) => {
    const token = Cookies.get("linktin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }
    return config;
    });

    api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        Cookies.remove("linktin_token");
        window.location.href = "/auth/login"; // ← corregido
        }
        return Promise.reject(error);
    }
    );

    export default api;
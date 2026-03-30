import axios from "axios";
import Cookies from "js-cookie";

// Instancia de axios con la URL base del backend.
// Todos los requests de la app usan esta instancia, no axios directamente.
// Así si mañana cambia la URL, solo cambiás este archivo.
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
        headers: {
            "Content-Type": "application/json",
    },
    });

// ─── Interceptor de request ───────────────────────────────────────────────
// Se ejecuta automáticamente ANTES de cada petición.
// Lee el token de la cookie y lo adjunta en el header Authorization.
// Sin esto, tendrías que escribir el header manualmente en cada llamada.
    api.interceptors.request.use((config) => {
        const token = Cookies.get("linktin_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

// ─── Interceptor de response ──────────────────────────────────────────────
// Se ejecuta automáticamente DESPUÉS de cada respuesta.
// Si el backend responde 401 (token expirado o inválido),
// limpia la cookie y redirige al login automáticamente.
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
            Cookies.remove("linktin_token");
            window.location.href = "/login";
            }
            return Promise.reject(error);
    }
    );

export default api;
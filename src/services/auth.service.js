import api from "../lib/axios";
import Cookies from "js-cookie";

// Cuántos días dura la cookie del token.
    // Debe coincidir con JWT_EXPIRES_IN del backend (7d = 7 días).
    const TOKEN_EXPIRY_DAYS = 7;

    // ─── Login ────────────────────────────────────────────────────────────────
    export const login = async ({ email, password }) => {
        const { data } = await api.post("/api/auth/login", { email, password });

        // Guardamos el token en cookie para que el interceptor lo use
        // en todas las peticiones siguientes automáticamente.
        Cookies.set("linktin_token", data.data.token, {
            expires: TOKEN_EXPIRY_DAYS,
            sameSite: "strict", // protección contra CSRF
    });

    return data.data; // { token, usuario: { id, email, tipo } }
    };

    // ─── Register ─────────────────────────────────────────────────────────────
        export const register = async ({ id_usuarios, email, password, tipo }) => {
        const { data } = await api.post("/api/auth/register", {
            id_usuarios,
            email,
            password,
            tipo,
    });

    // El backend hace login automático tras el registro,
    // así que también recibimos un token aquí.
    Cookies.set("linktin_token", data.data.token, {
            expires: TOKEN_EXPIRY_DAYS,
            sameSite: "strict",
    });

    return data.data; // { token, usuario: { id, email, tipo } }
    };

    // ─── Logout ───────────────────────────────────────────────────────────────
    export const logout = () => {
        Cookies.remove("linktin_token");
    };

    // ─── Obtener usuario actual ───────────────────────────────────────────────
    // Llama a GET /api/auth/me con el token que ya está en la cookie.
    // El interceptor lo adjunta automáticamente.
    // Útil para verificar si la sesión sigue activa al refrescar la página.
    export const getMe = async () => {
        const { data } = await api.get("/api/auth/me");
        return data.data; // { id, email, tipo }
    };

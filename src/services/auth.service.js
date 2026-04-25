    import api from "../lib/axios";
    import Cookies from "js-cookie";

    const TOKEN_EXPIRY_DAYS = 7;

    export const login = async ({ email, password }) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    Cookies.set("linktin_token", data.data.token, {
        expires: TOKEN_EXPIRY_DAYS,
        sameSite: "strict",
    });
    return data.data; // { token, usuario: { id, email, tipo } }
    };

    export const register = async ({ id_usuarios, email, password, tipo }) => {
    const { data } = await api.post("/api/auth/register", {
        id_usuarios,
        email,
        password,
        tipo,
    });
    Cookies.set("linktin_token", data.data.token, {
        expires: TOKEN_EXPIRY_DAYS,
        sameSite: "strict",
    });
    return data.data;
    };

    export const logout = () => {
    Cookies.remove("linktin_token");
    };

    export const getMe = async () => {
    const { data } = await api.get("/api/auth/me");
    return data.data;
    };
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, register as registerService, logout as logoutService, getMe } from "../services/auth.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

        const AuthContext = createContext();

        export function AuthProvider({ children }) {
        const [usuario, setUsuario]   = useState(null);
        const [cargando, setCargando] = useState(true); // true mientras verifica sesión
        const router = useRouter();

        // Al montar la app, verifica si hay token guardado y recupera el usuario.
        // Esto mantiene la sesión activa al refrescar la página.
        useEffect(() => {
            const verificarSesion = async () => {
            const token = Cookies.get("linktin_token");
            if (!token) {
                setCargando(false);
                return;
            }
            try {
                const data = await getMe();
                setUsuario(data);
            } catch {
                // Token inválido o expirado — el interceptor ya limpió la cookie
                setUsuario(null);
            } finally {
                setCargando(false);
            }
            };
            verificarSesion();
        }, []);

        const login = async ({ email, password }) => {
            const data = await loginService({ email, password });
            setUsuario(data.usuario);
            return data;
        };

        const register = async (formData) => {
            const data = await registerService(formData);
            setUsuario(data.usuario);
            return data;
        };

        const logout = () => {
            logoutService();
            setUsuario(null);
            router.push("/login");
        };

        return (
            <AuthContext.Provider value={{ usuario, cargando, login, logout, register }}>
            {children}
            </AuthContext.Provider>
        );
        }

        // Hook para consumir el context en cualquier componente
        export const useAuth = () => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
            return context;
};
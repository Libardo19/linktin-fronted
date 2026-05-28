    'use client'

    import { createContext, useContext, useState, useEffect } from 'react'
    import { useRouter } from 'next/navigation'
    import Cookies from 'js-cookie'
    import {
    login as loginService,
    register as registerService,
    logout as logoutService,
    getMe,
    } from '../services/auth.service'

    const AuthContext = createContext(null)

    export function AuthProvider({ children }) {
    const [usuario,  setUsuario]  = useState(null)
    const [cargando, setCargando] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const verificarSesion = async () => {
        const token = Cookies.get('linktin_token')
        if (!token) { setCargando(false); return }
        try {
            const data = await getMe()
            setUsuario(data)
        } catch {
            Cookies.remove('linktin_token')
            setUsuario(null)
        } finally {
            setCargando(false)
        }
        }
        verificarSesion()
    }, [])

    const login = async ({ email, password }) => {
        const data = await loginService({ email, password })
        setUsuario(data.usuario)
        // Redirección según tipo de usuario (incluye admin)
        if (data.usuario.tipo === 'admin') {
            router.push('/dashboardadmin')
        } else if (data.usuario.tipo === 'empresa') {
            router.push('/dashboardempresa')
        } else {
            router.push('/dashboardcandidato')
        }
        return data
    }

    const register = async (formData) => {
        const data = await registerService(formData)
        setUsuario(data.usuario)
        // Redirección según tipo de usuario (incluye admin)
        if (data.usuario.tipo === 'admin') {
            router.push('/dashboardadmin')
        } else if (data.usuario.tipo === 'empresa') {
            router.push('/dashboardempresa')
        } else {
            router.push('/dashboardcandidato')
        }
        return data
    }

    const logout = () => {
        logoutService()
        setUsuario(null)
        router.replace('/')
    }

    return (
        <AuthContext.Provider value={{ usuario, cargando, login, logout, register }}>
        {children}
        </AuthContext.Provider>
    )
    }

    export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
    return context
    }
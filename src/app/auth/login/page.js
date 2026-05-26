'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../context/AuthContext'
import { Sparkles, X, Heart, Check } from 'lucide-react'

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function EyeIcon({ open }) {
  return open ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

function LeftPanel() {
  return (
    <div className="hidden lg:flex w-[480px] min-w-[480px] h-screen sticky top-0 bg-[#0A1525] border-r border-white/[0.06] flex-col p-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute top-16 -left-20 w-[280px] h-[280px] rounded-full bg-emerald-500/20 blur-3xl" />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 mb-12">
        <h1 className="text-2xl font-bold text-white font-sora">Link<span className="text-blue-500">Tin</span></h1>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">
          Bienvenido de vuelta
        </p>
        <h2 className="text-4xl font-bold text-white font-sora mb-4 leading-tight">
          Tu próximo<br />
          <span className="text-blue-500">match</span><br />
          te espera.
        </h2>
        <p className="text-slate-400 text-sm max-w-sm mb-8">
          Miles de conexiones nuevas cada día entre candidatos y empresas.
        </p>

        <div className="relative h-52 mb-4">
          <div className="absolute bg-[#0D1B2A] w-56 left-8 top-4 border border-white/[0.04] rounded-2xl p-4 rotate-[4deg] opacity-40">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-violet-400 flex items-center justify-center mb-2 font-sora font-bold text-sm text-white">CR</div>
            <div className="font-sora font-bold text-sm text-white mb-1">Carlos R.</div>
            <div className="text-xs text-slate-400">Data Engineer</div>
          </div>
          <div className="absolute bg-[#0D1B2A] w-56 left-3 top-2 border border-white/[0.06] rounded-2xl p-4 rotate-[2deg] opacity-65">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center mb-2 font-sora font-bold text-sm text-white">SM</div>
            <div className="font-sora font-bold text-sm text-white mb-1">Sara M.</div>
            <div className="text-xs text-slate-400">UX/UI Designer</div>
          </div>
          <div className="absolute bg-[#0D1B2A] w-56 left-0 top-0 border border-blue-500/40 rounded-2xl p-4 z-30 shadow-xl">
            <div className="absolute -top-2 -right-2 z-40 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full px-3 py-1 font-sora font-bold text-xs text-white shadow-lg flex items-center gap-1">
              <Sparkles size={12} /> MATCH
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center mb-2 font-sora font-bold text-sm text-white">LA</div>
            <div className="font-sora font-bold text-sm text-white mb-1">Libardo Acosta</div>
            <div className="text-xs text-slate-400 mb-3">Full Stack Developer</div>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'Node.js', 'AWS'].map(s => (
                <span key={s} className="text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-5 relative z-10">
          <button className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-500/30 transition"><X size={16} /></button>
          <button className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 flex items-center justify-center hover:bg-emerald-500/30 transition"><Heart size={16} /></button>
          <span className="text-xs text-slate-400">Descubrir empresas / candidatos</span>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
          <span className="text-xs text-slate-400">
            <span className="text-emerald-500 font-semibold">2,847</span> usuarios activos ahora mismo
          </span>
        </div>
      </div>

      <div className="relative z-10 flex gap-6 pt-5 border-t border-white/[0.05]">
        {[
          { num: '50K+', label: 'Usuarios registrados' },
          { num: '98%', label: 'Precisión del matching' },
          { num: '8.4K', label: 'Empleos conectados' },
        ].map(s => (
          <div key={s.num}>
            <div className="font-sora text-xl font-bold text-white">{s.num}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LoginPage() {
  const { login } = useAuth()

  const [role, setRole] = useState('candidato')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Por favor completa todos los campos.'); return }
    setLoading(true)
    try {
      await login({ email, password })
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales inválidas. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-white text-slate-900">
      <LeftPanel />

      <div className="flex-1 overflow-y-auto flex items-center justify-center p-10 relative">
        <div className="fixed w-[700px] h-[600px] rounded-full bg-blue-500/10 -top-1/4 -right-1/4 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          <div className="flex mb-7 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white shadow-sm">
              Iniciar sesión
            </button>
            <Link href="/auth/register" className="flex-1 py-2.5 text-sm text-slate-400 rounded-lg flex items-center justify-center hover:text-slate-600 transition">
              Crear cuenta
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="font-sora text-3xl font-bold text-slate-900 mb-2">Bienvenido de nuevo</h1>
            <p className="text-slate-500 text-sm">Inicia sesión para continuar tu búsqueda</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="usuario@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm"
                />
                {email && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 text-sm"><Check size={16} /></span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <EyeIcon open={showPwd} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className="flex items-center gap-2 text-slate-600"
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center text-xs transition ${
                  remember ? 'bg-blue-600 text-white' : 'border-2 border-slate-300'
                }`}>
                  {remember && <Check size={12} />}
                </div>
                <span className="text-sm">Recordarme</span>
              </button>
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 font-medium hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-blue-600 text-white font-sora font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Iniciando sesión…
                </span>
              ) : 'Iniciar sesión →'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-300">o continúa con</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid gap-3 mb-5">
            {[
              { icon: <GoogleIcon />, label: 'Continuar con Google' },
            ].map(btn => (
              <button
                key={btn.label}
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition shadow-sm"
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>

          <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm text-slate-400">¿No tienes cuenta?</span>
            <Link href="/auth/register" className="text-sm font-semibold text-blue-600 hover:underline">
              Regístrate gratis 
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        .font-sora { font-family: 'Sora', sans-serif; }
      `}</style>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../context/AuthContext'

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

// El panel izquierdo se mantiene oscuro — es la identidad de marca de LinkTin
function LeftPanel() {
  return (
    <div style={{
      width: '480px',
      minWidth: '480px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      background: '#0A1525',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      padding: '48px 40px',
      overflow: 'hidden',
    }}>
      {/* Glows */}
      <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 65%)', bottom: -120, right: -80, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)', top: 60, left: -80, pointerEvents: 'none' }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

      {/* Logo */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: 48, fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
        Link<span style={{ color: '#3B82F6' }}>Tin</span>
      </div>

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: 11, color: '#3B82F6', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Bienvenido de vuelta
        </p>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 38, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16, color: '#fff' }}>
          Tu próximo<br />
          <span style={{ color: '#3B82F6' }}>match</span><br />
          te espera.
        </h2>
        <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, maxWidth: 340, marginBottom: 32 }}>
          Miles de conexiones nuevas cada día entre candidatos y empresas en toda Colombia y LATAM.
        </p>

        {/* Card Stack */}
        <div style={{ position: 'relative', height: 210, marginBottom: 16 }}>
          <div style={{ position: 'absolute', background: '#0D1B2A', width: 230, left: 28, top: 18, border: '0.5px solid rgba(255,255,255,0.04)', borderRadius: 16, padding: '16px', transform: 'rotate(4deg)', opacity: 0.4 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: '#fff' }}>CR</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 3 }}>Carlos R.</div>
            <div style={{ fontSize: 12, color: '#475569' }}>Data Engineer</div>
          </div>
          <div style={{ position: 'absolute', background: '#0D1B2A', width: 230, left: 14, top: 9, border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '16px', transform: 'rotate(2deg)', opacity: 0.65 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: '#fff' }}>SM</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 3 }}>Sara M.</div>
            <div style={{ fontSize: 12, color: '#475569' }}>UX/UI Designer</div>
          </div>
          <div style={{ position: 'absolute', background: '#0D1B2A', width: 230, left: 0, top: 0, border: '0.5px solid rgba(59,130,246,0.25)', borderRadius: 16, padding: '16px', zIndex: 30, boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}>
            <div style={{ position: 'absolute', top: -9, right: -9, zIndex: 40, background: 'linear-gradient(135deg,#10B981,#059669)', borderRadius: 20, padding: '4px 10px', fontFamily: "'Sora',sans-serif", fontSize: 10, fontWeight: 700, color: '#fff', boxShadow: '0 4px 16px rgba(16,185,129,0.4)' }}>
              ✦ MATCH
            </div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: '#fff' }}>LA</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 3 }}>Libardo Acosta</div>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 10 }}>Full Stack Developer</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['React', 'Node.js', 'AWS'].map(s => (
                <span key={s} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: 'rgba(59,130,246,0.1)', color: '#93C5FD', border: '0.5px solid rgba(59,130,246,0.2)' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Swipe */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, position: 'relative', zIndex: 10 }}>
          <button style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '0.5px solid rgba(239,68,68,0.2)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>✕</button>
          <button style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '0.5px solid rgba(16,185,129,0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>♥</button>
          <span style={{ fontSize: 12, color: '#374151' }}>Descubrir empresas / candidatos</span>
        </div>

        {/* Online */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.5)' }} />
          <span style={{ fontSize: 12, color: '#475569' }}>
            <span style={{ color: '#10B981', fontWeight: 600 }}>2,847</span> usuarios activos ahora mismo
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: 24, paddingTop: 20, borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
        {[
          { num: '50K+', lbl: 'Usuarios registrados' },
          { num: '98%',  lbl: 'Precisión del matching' },
          { num: '8.4K', lbl: 'Empleos conectados' },
        ].map(s => (
          <div key={s.num}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: '#374151', marginTop: 2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LoginPage() {
  const { login } = useAuth()

  const [role,     setRole]     = useState('candidato')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

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
    <div style={{ display: 'flex', height: '100vh', background: '#FFFFFF', color: '#0F172A', fontFamily: "'DM Sans',sans-serif", overflow: 'hidden' }}>

      <LeftPanel />

      {/* Panel derecho — fondo blanco */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', position: 'relative', background: '#FFFFFF' }}>

        {/* Glow suave azul sobre blanco */}
        <div style={{ position: 'fixed', width: 700, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)', top: '50%', left: '60%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 440 }}>

          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: 28, padding: 4, borderRadius: 12, background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
            <button style={{ flex: 1, padding: '10px 0', textAlign: 'center', fontSize: 13, borderRadius: 8, background: '#1D4ED8', color: '#fff', fontWeight: 600, fontFamily: "'Sora',sans-serif", border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(29,78,216,0.25)' }}>
              Iniciar sesión
            </button>
            <Link href="/auth/register" style={{ flex: 1, padding: '10px 0', textAlign: 'center', fontSize: 13, borderRadius: 8, color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              Crear cuenta
            </Link>
          </div>

          {/* Título */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: -1, color: '#0F172A', marginBottom: 6 }}>
              Bienvenido de nuevo
            </h1>
            <p style={{ fontSize: 14, color: '#94A3B8' }}>Inicia sesión para continuar tu búsqueda</p>
          </div>

          {/* Selector de rol */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {[
              { id: 'candidato', icon: '👤', label: 'Candidato', desc: 'Busco empleo' },
              { id: 'empresa',   icon: '🏢', label: 'Empresa',   desc: 'Busco talento' },
            ].map(r => (
              <button key={r.id} type="button" onClick={() => setRole(r.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  borderRadius: 12, padding: '12px 14px',
                  border: role === r.id ? '1.5px solid #1D4ED8' : '1px solid #E2E8F0',
                  background: role === r.id ? '#EFF6FF' : '#F8FAFC',
                  cursor: 'pointer', textAlign: 'left',
                  boxShadow: role === r.id ? '0 0 0 3px rgba(29,78,216,0.08)' : 'none',
                  transition: 'all .15s',
                }}>
                <span style={{ fontSize: 20 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{r.desc}</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: role === r.id ? '#1D4ED8' : '#CBD5E1', boxShadow: role === r.id ? '0 0 6px rgba(29,78,216,0.4)' : 'none' }} />
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                Correo electrónico
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email" value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="usuario@email.com" autoComplete="email"
                  style={{ width: '100%', padding: '12px 16px', paddingRight: 40, borderRadius: 9, background: '#F8FAFC', color: '#0F172A', fontSize: 14, border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans',sans-serif', transition: 'border-color .2s'" }}
                  onFocus={e => { e.target.style.borderColor = '#1D4ED8'; e.target.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.08)' }}
                  onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                />
                {email && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#10B981', fontSize: 14 }}>✓</span>}
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'} value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••" autoComplete="current-password"
                  style={{ width: '100%', padding: '12px 16px', paddingRight: 40, borderRadius: 9, background: '#F8FAFC', color: '#0F172A', fontSize: 14, border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans',sans-serif" }}
                  onFocus={e => { e.target.style.borderColor = '#1D4ED8'; e.target.style.boxShadow = '0 0 0 3px rgba(29,78,216,0.08)' }}
                  onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <EyeIcon open={showPwd} />
                </button>
              </div>
            </div>

            {/* Recordarme */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button type="button" onClick={() => setRemember(!remember)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', color: '#475569', padding: 0 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, background: remember ? '#1D4ED8' : '#fff', border: `1.5px solid ${remember ? '#1D4ED8' : '#CBD5E1'}`, color: '#fff' }}>
                  {remember && '✓'}
                </div>
                <span style={{ fontSize: 13 }}>Recordarme</span>
              </button>
              <Link href="/auth/forgot-password" style={{ fontSize: 13, color: '#1D4ED8', textDecoration: 'none', fontWeight: 500 }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding: '12px 16px', borderRadius: 10, background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: 13 }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '13px 0', borderRadius: 10, border: 'none', background: '#1D4ED8', color: '#fff', fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 14px rgba(29,78,216,0.3)' }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Iniciando sesión…
                </span>
              ) : 'Iniciar sesión →'}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.1),transparent)', pointerEvents: 'none' }} />
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: 12, color: '#CBD5E1' }}>o continúa con</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Social */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {[
              { icon: <GoogleIcon />,   label: 'Continuar con Google' },
              { icon: <LinkedInIcon />, label: 'Continuar con LinkedIn' },
            ].map(btn => (
              <button key={btn.label} type="button"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 0', borderRadius: 8, border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#475569', fontSize: 13, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', padding: 16, borderRadius: 10, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: 13, color: '#94A3B8' }}>¿No tienes cuenta? </span>
            <Link href="/auth/register" style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8', textDecoration: 'none' }}>
              Regístrate gratis — es en menos de 2 minutos
            </Link>
          </div>

          {/* Security */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            {['🔒 Conexión segura SSL', 'Tus datos están protegidos', 'GDPR compliant'].map((txt, i) => (
              <span key={txt} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#CBD5E1', display: 'inline-block' }} />}
                <span style={{ fontSize: 11, color: '#CBD5E1' }}>{txt}</span>
              </span>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #CBD5E1; }
      `}</style>
    </div>
  )
}
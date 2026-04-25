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

    function getPwdStrength(pwd) {
    if (!pwd) return { score: 0, label: '', color: '' }
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    const map = {
        1: { label: 'Débil',   color: '#EF4444' },
        2: { label: 'Regular', color: '#F59E0B' },
        3: { label: 'Buena',   color: '#10B981' },
        4: { label: 'Fuerte',  color: '#10B981' },
    }
    return { score, ...(map[score] || { label: '', color: '' }) }
    }

    function StepsIndicator({ role }) {
    const isEmpresa = role === 'empresa'
    const accent = isEmpresa ? '#D97706' : '#1D4ED8'
    const steps = ['Rol', 'Datos', 'Perfil', 'Listo']
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        {steps.map((s, i) => {
            const isDone   = i < 1
            const isActive = i === 1
            return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 700, flexShrink: 0,
                    background: (isDone || isActive) ? accent : '#F1F5F9',
                    color: (isDone || isActive) ? '#fff' : '#94A3B8',
                    border: (!isDone && !isActive) ? '1px solid #E2E8F0' : 'none',
                    boxShadow: isActive ? `0 0 0 3px ${accent}22` : 'none',
                }}>
                    {isDone ? '✓' : i + 1}
                </div>
                <span style={{
                    fontSize: 12,
                    color: isDone ? accent : isActive ? '#0F172A' : '#94A3B8',
                    fontWeight: isActive ? 600 : 400,
                }}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                <div style={{ flex: 1, height: '1px', background: isDone ? accent : '#E2E8F0', margin: '0 8px' }} />
                )}
            </div>
            )
        })}
        </div>
    )
    }

    // Panel izquierdo — se mantiene oscuro (identidad de marca)
    function LeftPanel({ role }) {
    const isEmpresa = role === 'empresa'
    const glowColor   = isEmpresa ? 'rgba(245,158,11,0.14)' : 'rgba(29,78,216,0.16)'
    const glowColor2  = isEmpresa ? 'rgba(245,158,11,0.07)' : 'rgba(16,185,129,0.08)'
    const gridColor   = isEmpresa ? 'rgba(245,158,11,0.025)' : 'rgba(59,130,246,0.03)'
    const accentColor = isEmpresa ? '#F59E0B' : '#3B82F6'
    const cardBorder  = isEmpresa ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.18)'

    return (
        <div style={{
        width: 480, minWidth: 480, height: '100vh', position: 'sticky', top: 0,
        background: '#0A1525', borderRight: '0.5px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', padding: '48px 40px', overflow: 'hidden',
        }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${glowColor} 0%,transparent 65%)`, bottom: -100, right: -100, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: `radial-gradient(circle,${glowColor2} 0%,transparent 65%)`, top: 80, left: -60, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${gridColor} 1px,transparent 1px),linear-gradient(90deg,${gridColor} 1px,transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, marginBottom: 48, fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
            Link<span style={{ color: '#3B82F6' }}>Tin</span>
        </div>

        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: 11, color: accentColor, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
            {isEmpresa ? 'Para empresas' : 'Plataforma de networking'}
            </p>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16, color: '#fff' }}>
            {isEmpresa
                ? <> Encuentra el<br /><span style={{ color: accentColor }}>talento</span><br />que necesitas.</>
                : <> Tu carrera,<br /><span style={{ color: accentColor }}>tu match,</span><br />tu historia.</>}
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, maxWidth: 340, marginBottom: 32 }}>
            {isEmpresa
                ? 'Conecta con los mejores profesionales de tecnología en Colombia y LATAM con precisión de matching.'
                : 'Únete a miles de profesionales que ya encontraron su próximo paso profesional en LinkTin.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {isEmpresa ? (
                <>
                {[
                    { av: 'TN', bg: 'linear-gradient(135deg,#D97706,#F59E0B)', name: 'TechNova S.A.S', role: 'Desarrollo Frontend', badge: '3 vacantes', bc: 'rgba(245,158,11,0.12)', bcolor: '#FCD34D', bb: 'rgba(245,158,11,0.25)' },
                    { av: 'FX', bg: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', name: 'FinaXpert',       role: 'Data Science / ML',   badge: '5 vacantes', bc: 'rgba(59,130,246,0.12)', bcolor: '#93C5FD', bb: 'rgba(59,130,246,0.25)' },
                    { av: 'SC', bg: 'linear-gradient(135deg,#059669,#10B981)', name: 'Salud Connect',   role: 'Backend / APIs',       badge: '2 vacantes', bc: 'rgba(16,185,129,0.12)', bcolor: '#10B981', bb: 'rgba(16,185,129,0.25)' },
                ].map(c => (
                    <div key={c.name} style={{ background: '#0D1B2A', border: `0.5px solid ${cardBorder}`, borderRadius: 14, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.av}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: '#fff' }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{c.role}</div>
                    </div>
                    <span style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, fontWeight: 600, background: c.bc, color: c.bcolor, border: `0.5px solid ${c.bb}` }}>{c.badge}</span>
                    </div>
                ))}
                <div style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.06))', border: '0.5px solid rgba(245,158,11,0.25)', borderRadius: 12, padding: '12px 15px', display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', flexShrink: 0, boxShadow: '0 0 8px rgba(245,158,11,0.5)' }} />
                    <span style={{ fontSize: 12, color: '#D97706', fontWeight: 500 }}>
                    <span style={{ fontFamily: "'Sora',sans-serif", color: '#FCD34D', fontWeight: 700 }}>47 candidatos</span> en match disponibles hoy
                    </span>
                </div>
                </>
            ) : (
                <>
                {[
                    { av: 'LA', bg: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', name: 'Libardo A.',  role: 'Full Stack Dev',  badge: 'Disponible',  bc: 'rgba(16,185,129,0.12)', bcolor: '#10B981', bb: 'rgba(16,185,129,0.25)' },
                    { av: 'SM', bg: 'linear-gradient(135deg,#059669,#10B981)', name: 'Sara M.',     role: 'UX/UI Designer', badge: 'En proceso',  bc: 'rgba(59,130,246,0.12)', bcolor: '#93C5FD', bb: 'rgba(59,130,246,0.25)' },
                    { av: 'CR', bg: 'linear-gradient(135deg,#7C3AED,#A78BFA)', name: 'Carlos R.',   role: 'Data Engineer',  badge: 'Contratado',  bc: 'rgba(245,158,11,0.10)', bcolor: '#FCD34D', bb: 'rgba(245,158,11,0.25)' },
                ].map(c => (
                    <div key={c.name} style={{ background: '#0D1B2A', border: `0.5px solid ${cardBorder}`, borderRadius: 14, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.av}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: '#fff' }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{c.role}</div>
                    </div>
                    <span style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, fontWeight: 600, background: c.bc, color: c.bcolor, border: `0.5px solid ${c.bb}` }}>{c.badge}</span>
                    </div>
                ))}
                </>
            )}
            </div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: 24, paddingTop: 20, borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
            {[{ num: '50K+', lbl: 'Usuarios registrados' }, { num: '98%', lbl: 'Precisión del matching' }, { num: '8.4K', lbl: 'Empleos conectados' }].map(s => (
            <div key={s.num}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff' }}>{s.num}</div>
                <div style={{ fontSize: 11, color: '#374151', marginTop: 2 }}>{s.lbl}</div>
            </div>
            ))}
        </div>
        </div>
    )
    }

    const SKILLS_CANDIDATO = ['React', 'Node.js', 'PostgreSQL', 'Python', 'Docker', 'AWS', 'Vue.js', 'TypeScript', 'MongoDB', 'GraphQL']
    const SKILLS_EMPRESA   = ['Desarrollo Frontend', 'Backend / APIs', 'DevOps / Cloud', 'Data Science', 'IA / ML', 'Diseño UX/UI', 'QA / Testing', 'Ciberseguridad', 'Mobile Dev', 'Gestión de Proyectos']

    export default function RegisterPage() {
    const { register } = useAuth()

    const [role,        setRole]        = useState('candidato')
    const isEmpresa  = role === 'empresa'
    const accent     = isEmpresa ? '#D97706' : '#1D4ED8'
    const accentRing = isEmpresa ? 'rgba(245,158,11,0.15)' : 'rgba(29,78,216,0.1)'

    const [nombre,      setNombre]      = useState('')
    const [apellido,    setApellido]    = useState('')
    const [titulo,      setTitulo]      = useState('')
    const [ciudad,      setCiudad]      = useState('')
    const [empNombre,   setEmpNombre]   = useState('')
    const [nit,         setNit]         = useState('')
    const [sector,      setSector]      = useState('Tecnología e Innovación')
    const [tamano,      setTamano]      = useState('11 – 50 empleados')
    const [ciudadEmp,   setCiudadEmp]   = useState('')
    const [sitioWeb,    setSitioWeb]    = useState('')
    const [responsable, setResponsable] = useState('')
    const [cargo,       setCargo]       = useState('')
    const [email,       setEmail]       = useState('')
    const [password,    setPassword]    = useState('')
    const [confirmPwd,  setConfirmPwd]  = useState('')
    const [showPwd,     setShowPwd]     = useState(false)
    const [showConf,    setShowConf]    = useState(false)
    const [skills,      setSkills]      = useState([])
    const [terms,       setTerms]       = useState(false)
    const [loading,     setLoading]     = useState(false)
    const [error,       setError]       = useState('')
    const [focused,     setFocused]     = useState({})

    const pwdStrength = getPwdStrength(password)
    const pwdMatch    = confirmPwd && password === confirmPwd

    const toggleSkill = (s) => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!email || !password) { setError('Completa todos los campos obligatorios.'); return }
        if (password !== confirmPwd) { setError('Las contraseñas no coinciden.'); return }
        if (!terms) { setError('Debes aceptar los términos y condiciones.'); return }
        setLoading(true)
        try {
        await register({
            email, password, tipo: role,
            ...(isEmpresa
            ? { nombre: empNombre, nit, sector, tamano, ciudad: ciudadEmp, sitioWeb, responsable, cargo }
            : { nombre, apellido, titulo, ciudad, habilidades: skills })
        })
        } catch (err) {
        setError(err.response?.data?.message || 'Error al crear la cuenta. Intenta de nuevo.')
        } finally {
        setLoading(false)
        }
    }

    // ── Estilos del panel derecho (tema claro) ──
    const inputStyle = (key) => ({
        width: '100%', padding: '12px 14px', borderRadius: 8,
        background: '#F8FAFC', color: '#0F172A', fontSize: 14,
        border: focused[key] ? `1.5px solid ${accent}` : '1px solid #E2E8F0',
        boxShadow: focused[key] ? `0 0 0 3px ${accentRing}` : 'none',
        outline: 'none', fontFamily: "'DM Sans',sans-serif", boxSizing: 'border-box',
        transition: 'border-color .15s, box-shadow .15s',
    })

    const fProps = (key) => ({
        onFocus: () => setFocused(p => ({ ...p, [key]: true })),
        onBlur:  () => setFocused(p => ({ ...p, [key]: false })),
        style: inputStyle(key),
    })

    const label = {
        display: 'block', fontSize: 12, color: '#475569', marginBottom: 6, fontWeight: 600,
    }

    const sectionLabel = {
        fontSize: 10, color: '#94A3B8', textTransform: 'uppercase',
        letterSpacing: 2, fontWeight: 700, margin: '20px 0 12px',
        paddingTop: 20, borderTop: '1px solid #F1F5F9', display: 'block',
    }

    const selectStyle = {
        width: '100%', padding: '12px 14px', borderRadius: 8,
        background: '#F8FAFC', color: '#0F172A', fontSize: 14,
        border: `1px solid ${isEmpresa ? 'rgba(245,158,11,0.4)' : '#E2E8F0'}`,
        outline: 'none', appearance: 'none', cursor: 'pointer',
        fontFamily: "'DM Sans',sans-serif", boxSizing: 'border-box',
    }

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#FFFFFF', color: '#0F172A', fontFamily: "'DM Sans',sans-serif", overflow: 'hidden' }}>

        <LeftPanel role={role} />

        {/* Panel derecho — fondo blanco con scroll */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '40px 48px', position: 'relative', background: '#FFFFFF' }}>

            {/* Glow suave */}
            <div style={{ position: 'fixed', width: 600, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${isEmpresa ? 'rgba(245,158,11,0.05)' : 'rgba(59,130,246,0.05)'} 0%,transparent 65%)`, top: '50%', left: '60%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 520 }}>

            {/* Tabs */}
            <div style={{ display: 'flex', marginBottom: 28, padding: 4, borderRadius: 10, background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                <Link href="/auth/login" style={{ flex: 1, padding: '9px 0', textAlign: 'center', fontSize: 13, borderRadius: 7, color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Iniciar sesión
                </Link>
                <button style={{ flex: 1, padding: '9px 0', textAlign: 'center', fontSize: 13, borderRadius: 7, background: accent, color: '#fff', fontWeight: 600, fontFamily: "'Sora',sans-serif", border: 'none', cursor: 'pointer', boxShadow: `0 2px 8px ${accent}44` }}>
                Crear cuenta
                </button>
            </div>

            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: -1, color: '#0F172A', marginBottom: 6 }}>
                Crea tu cuenta
                </h1>
                <p style={{ fontSize: 14, color: '#94A3B8' }}>
                ¿Ya tienes cuenta?{' '}
                <Link href="/auth/login" style={{ color: accent, textDecoration: 'none', fontWeight: 500 }}>
                    Inicia sesión aquí
                </Link>
                </p>
            </div>

            {/* Role selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                {[
                { id: 'candidato', icon: '👤', title: 'Soy candidato', desc: 'Busco oportunidades laborales y quiero conectar con empresas.' },
                { id: 'empresa',   icon: '🏢', title: 'Soy empresa',   desc: 'Quiero publicar vacantes y encontrar el talento ideal para mi equipo.' },
                ].map(r => {
                const isSelected  = role === r.id
                const borderColor = isSelected ? (r.id === 'empresa' ? '#D97706' : '#1D4ED8') : '#E2E8F0'
                const bgColor     = isSelected ? (r.id === 'empresa' ? '#FFFBEB' : '#EFF6FF') : '#F8FAFC'
                const dotColor    = isSelected ? (r.id === 'empresa' ? '#D97706' : '#1D4ED8') : 'transparent'
                return (
                    <button key={r.id} type="button" onClick={() => { setRole(r.id); setSkills([]) }}
                    style={{ borderRadius: 12, padding: 16, border: `1.5px solid ${borderColor}`, background: bgColor, cursor: 'pointer', textAlign: 'left', position: 'relative', boxShadow: isSelected ? `0 0 0 3px ${dotColor}22` : 'none', transition: 'all .15s' }}>
                    {isSelected && (
                        <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: dotColor, boxShadow: `0 0 6px ${dotColor}88` }} />
                    )}
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{r.icon}</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.5 }}>{r.desc}</div>
                    </button>
                )
                })}
            </div>

            {/* Steps */}
            <StepsIndicator role={role} />

            <form onSubmit={handleSubmit} noValidate>

                {/* ── CANDIDATO ── */}
                {!isEmpresa && (
                <>
                    <span style={sectionLabel}>Información personal</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                        <label style={label}>Nombre</label>
                        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Libardo" {...fProps('nombre')} />
                    </div>
                    <div>
                        <label style={label}>Apellido</label>
                        <input value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Acosta" {...fProps('apellido')} />
                    </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                    <label style={label}>Correo electrónico</label>
                    <div style={{ position: 'relative' }}>
                        <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} placeholder="usuario@email.com" {...fProps('email')} style={{ ...inputStyle('email'), paddingRight: 36 }} />
                        {email && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#10B981', fontSize: 14 }}>✓</span>}
                    </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                        <label style={label}>Contraseña</label>
                        <div style={{ position: 'relative' }}>
                        <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" {...fProps('pwd')} style={{ ...inputStyle('pwd'), paddingRight: 36 }} />
                        <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}>
                            <EyeIcon open={showPwd} />
                        </button>
                        </div>
                        {password && (
                        <div style={{ marginTop: 8, display: 'flex', gap: 4, alignItems: 'center' }}>
                            {[1,2,3,4].map(i => (
                            <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= pwdStrength.score ? pwdStrength.color : '#E2E8F0' }} />
                            ))}
                            <span style={{ fontSize: 10, color: pwdStrength.color, marginLeft: 6 }}>{pwdStrength.label}</span>
                        </div>
                        )}
                    </div>
                    <div>
                        <label style={label}>Confirmar contraseña</label>
                        <div style={{ position: 'relative' }}>
                        <input type={showConf ? 'text' : 'password'} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="••••••••" {...fProps('conf')} style={{ ...inputStyle('conf'), paddingRight: 36 }} />
                        <button type="button" onClick={() => setShowConf(!showConf)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: pwdMatch ? '#10B981' : '#94A3B8', display: 'flex' }}>
                            {pwdMatch ? <span style={{ fontSize: 14 }}>✓</span> : <EyeIcon open={showConf} />}
                        </button>
                        </div>
                    </div>
                    </div>

                    <span style={sectionLabel}>Información profesional</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                        <label style={label}>Título profesional</label>
                        <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Full Stack Developer" {...fProps('titulo')} />
                    </div>
                    <div>
                        <label style={label}>Ciudad</label>
                        <input value={ciudad} onChange={e => setCiudad(e.target.value)} placeholder="Valledupar, Colombia" {...fProps('ciudad')} />
                    </div>
                    </div>

                    <label style={label}>
                    Tus habilidades principales <span style={{ color: '#CBD5E1', fontWeight: 400 }}>(selecciona las que aplican)</span>
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
                    {SKILLS_CANDIDATO.map(s => (
                        <button key={s} type="button" onClick={() => toggleSkill(s)}
                        style={{ padding: '6px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer', border: `1.5px solid ${skills.includes(s) ? '#1D4ED8' : '#E2E8F0'}`, color: skills.includes(s) ? '#1D4ED8' : '#94A3B8', background: skills.includes(s) ? '#EFF6FF' : '#F8FAFC', fontWeight: skills.includes(s) ? 600 : 400, transition: 'all .15s' }}>
                        {s}
                        </button>
                    ))}
                    </div>
                </>
                )}

                {/* ── EMPRESA ── */}
                {isEmpresa && (
                <>
                    <span style={sectionLabel}>Datos de la empresa</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                        <label style={label}>Nombre de la empresa</label>
                        <input value={empNombre} onChange={e => setEmpNombre(e.target.value)} placeholder="TechNova S.A.S" {...fProps('empNombre')} />
                    </div>
                    <div>
                        <label style={label}>NIT / RUT</label>
                        <div style={{ position: 'relative' }}>
                        <input value={nit} onChange={e => setNit(e.target.value)} placeholder="900.123.456-7" {...fProps('nit')} style={{ ...inputStyle('nit'), paddingRight: 36 }} />
                        {nit && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#10B981', fontSize: 14 }}>✓</span>}
                        </div>
                    </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                        <label style={label}>Sector / Industria</label>
                        <select value={sector} onChange={e => setSector(e.target.value)} style={selectStyle}>
                        {['Tecnología e Innovación','Finanzas','Salud','Educación','Retail','Manufactura','Consultoría'].map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={label}>Tamaño de la empresa</label>
                        <select value={tamano} onChange={e => setTamano(e.target.value)} style={selectStyle}>
                        {['1 – 10 empleados','11 – 50 empleados','51 – 200 empleados','201 – 500 empleados','500+ empleados'].map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                        <label style={label}>Ciudad / País</label>
                        <input value={ciudadEmp} onChange={e => setCiudadEmp(e.target.value)} placeholder="Valledupar, Colombia" {...fProps('ciudadEmp')} />
                    </div>
                    <div>
                        <label style={label}>Sitio web</label>
                        <div style={{ position: 'relative' }}>
                        <input value={sitioWeb} onChange={e => setSitioWeb(e.target.value)} placeholder="www.miempresa.co" {...fProps('sitioWeb')} style={{ ...inputStyle('sitioWeb'), paddingRight: 36 }} />
                        {sitioWeb && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#10B981', fontSize: 14 }}>✓</span>}
                        </div>
                    </div>
                    </div>

                    <span style={sectionLabel}>Datos del responsable</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                        <label style={label}>Nombre del responsable</label>
                        <input value={responsable} onChange={e => setResponsable(e.target.value)} placeholder="María Fernanda" {...fProps('responsable')} />
                    </div>
                    <div>
                        <label style={label}>Cargo</label>
                        <input value={cargo} onChange={e => setCargo(e.target.value)} placeholder="Head of Talent" {...fProps('cargo')} />
                    </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                    <label style={label}>Correo corporativo</label>
                    <div style={{ position: 'relative' }}>
                        <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} placeholder="contacto@empresa.co" {...fProps('emailEmp')} style={{ ...inputStyle('emailEmp'), paddingRight: 36 }} />
                        {email && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#10B981', fontSize: 14 }}>✓</span>}
                    </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div>
                        <label style={label}>Contraseña</label>
                        <div style={{ position: 'relative' }}>
                        <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" {...fProps('pwdE')} style={{ ...inputStyle('pwdE'), paddingRight: 36 }} />
                        <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}>
                            <EyeIcon open={showPwd} />
                        </button>
                        </div>
                        {password && (
                        <div style={{ marginTop: 8, display: 'flex', gap: 4, alignItems: 'center' }}>
                            {[1,2,3,4].map(i => (
                            <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= pwdStrength.score ? pwdStrength.color : '#E2E8F0' }} />
                            ))}
                            <span style={{ fontSize: 10, color: pwdStrength.color, marginLeft: 6 }}>{pwdStrength.label}</span>
                        </div>
                        )}
                    </div>
                    <div>
                        <label style={label}>Confirmar contraseña</label>
                        <div style={{ position: 'relative' }}>
                        <input type={showConf ? 'text' : 'password'} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="••••••••" {...fProps('confE')} style={{ ...inputStyle('confE'), paddingRight: 36 }} />
                        <button type="button" onClick={() => setShowConf(!showConf)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: pwdMatch ? '#10B981' : '#94A3B8', display: 'flex' }}>
                            {pwdMatch ? <span style={{ fontSize: 14 }}>✓</span> : <EyeIcon open={showConf} />}
                        </button>
                        </div>
                    </div>
                    </div>

                    <label style={label}>
                    Áreas de contratación <span style={{ color: '#CBD5E1', fontWeight: 400 }}>(selecciona las que aplican)</span>
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
                    {SKILLS_EMPRESA.map(s => (
                        <button key={s} type="button" onClick={() => toggleSkill(s)}
                        style={{ padding: '6px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer', border: `1.5px solid ${skills.includes(s) ? '#D97706' : '#E2E8F0'}`, color: skills.includes(s) ? '#D97706' : '#94A3B8', background: skills.includes(s) ? '#FFFBEB' : '#F8FAFC', fontWeight: skills.includes(s) ? 600 : 400, transition: 'all .15s' }}>
                        {s}
                        </button>
                    ))}
                    </div>
                </>
                )}

                {/* Terms */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24 }}>
                <button type="button" onClick={() => setTerms(!terms)}
                    style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, background: terms ? accent : '#fff', border: `1.5px solid ${terms ? accent : '#CBD5E1'}`, color: '#fff', cursor: 'pointer', padding: 0 }}>
                    {terms && '✓'}
                </button>
                <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                    Acepto los <Link href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 500 }}>Términos y Condiciones</Link> y la <Link href="#" style={{ color: accent, textDecoration: 'none', fontWeight: 500 }}>Política de Privacidad</Link> de LinkTin.{' '}
                    {isEmpresa ? 'Autorizo el uso de los datos de mi empresa para el proceso de matching.' : 'Entiendo que mis datos serán usados para mejorar la precisión del matching.'}
                </p>
                </div>

                {/* Error */}
                {error && (
                <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 10, background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: 13 }}>
                    {error}
                </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={loading}
                style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: accent, color: '#fff', fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginBottom: 16, boxShadow: `0 4px 14px ${accent}44` }}>
                {loading ? 'Creando cuenta…' : (isEmpresa ? 'Registrar empresa en LinkTin →' : 'Crear mi cuenta en LinkTin →')}
                </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
                <span style={{ fontSize: 12, color: '#CBD5E1' }}>o regístrate con</span>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            </div>

            {/* Social */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, paddingBottom: 40 }}>
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

            </div>
        </div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            input::placeholder { color: #CBD5E1; }
            select option { background: #fff; color: #0F172A; }
        `}</style>
        </div>
    )
    }
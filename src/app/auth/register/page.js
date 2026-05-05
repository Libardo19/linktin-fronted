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
    if (!pwd) return { score: 0, label: '', barColor: '', textColor: '' }
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    const map = {
        1: { label: 'Débil',   barColor: 'bg-red-500',    textColor: 'text-red-500'    },
        2: { label: 'Regular', barColor: 'bg-amber-400',   textColor: 'text-amber-500'  },
        3: { label: 'Buena',   barColor: 'bg-emerald-500', textColor: 'text-emerald-500'},
        4: { label: 'Fuerte',  barColor: 'bg-emerald-500', textColor: 'text-emerald-500'},
    }
    return { score, ...(map[score] || { label: '', barColor: '', textColor: '' }) }
    }

    function StepsIndicator({ role }) {
    const isEmpresa = role === 'empresa'
    const steps = ['Rol', 'Datos', 'Perfil', 'Listo']
    return (
        <div className="flex items-center mb-6">
        {steps.map((s, i) => {
            const isDone   = i < 1
            const isActive = i === 1
            const filled = isDone || isActive
            const circleCls = filled
            ? isEmpresa
                ? `bg-amber-600 text-white ${isActive ? 'ring-2 ring-offset-1 ring-amber-300' : ''}`
                : `bg-blue-700 text-white ${isActive ? 'ring-2 ring-offset-1 ring-blue-300' : ''}`
            : 'bg-slate-100 text-slate-400 border border-slate-200'
            const labelCls = isDone
            ? isEmpresa ? 'text-amber-600' : 'text-blue-700'
            : isActive
            ? 'text-slate-900 font-semibold'
            : 'text-slate-400'
            const lineCls = isDone
            ? isEmpresa ? 'bg-amber-600' : 'bg-blue-700'
            : 'bg-slate-200'
            return (
            <div key={s} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className="flex items-center gap-1.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${circleCls}`}>
                    {isDone ? '✓' : i + 1}
                </div>
                <span className={`text-xs ${labelCls}`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${lineCls}`} />
                )}
            </div>
            )
        })}
        </div>
    )
    }

    function LeftPanel({ role }) {
    const isEmpresa = role === 'empresa'

    const candidatoCards = [
        { av: 'LA', gradFrom: 'from-blue-800',   gradTo: 'to-blue-500',    rounded: 'rounded-full', name: 'Libardo A.',  sub: 'Full Stack Dev',  badge: 'Disponible', badgeCls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' },
        { av: 'SM', gradFrom: 'from-emerald-700', gradTo: 'to-emerald-400', rounded: 'rounded-full', name: 'Sara M.',     sub: 'UX/UI Designer', badge: 'En proceso',  badgeCls: 'bg-blue-500/10 text-blue-300 border border-blue-500/25'         },
        { av: 'CR', gradFrom: 'from-violet-700',  gradTo: 'to-violet-400',  rounded: 'rounded-full', name: 'Carlos R.',   sub: 'Data Engineer',  badge: 'Contratado', badgeCls: 'bg-amber-500/10 text-amber-300 border border-amber-500/25'      },
    ]
    const empresaCards = [
        { av: 'TN', gradFrom: 'from-amber-700',   gradTo: 'to-amber-400',   rounded: 'rounded-xl',   name: 'TechNova S.A.S', sub: 'Desarrollo Frontend', badge: '3 vacantes', badgeCls: 'bg-amber-500/10 text-amber-300 border border-amber-500/25'   },
        { av: 'FX', gradFrom: 'from-blue-800',    gradTo: 'to-blue-500',    rounded: 'rounded-xl',   name: 'FinaXpert',       sub: 'Data Science / ML',   badge: '5 vacantes', badgeCls: 'bg-blue-500/10 text-blue-300 border border-blue-500/25'      },
        { av: 'SC', gradFrom: 'from-emerald-700', gradTo: 'to-emerald-400', rounded: 'rounded-xl',   name: 'Salud Connect',   sub: 'Backend / APIs',      badge: '2 vacantes', badgeCls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'},
    ]
    const cards = isEmpresa ? empresaCards : candidatoCards
    const cardBorderCls = isEmpresa ? 'border-amber-500/15' : 'border-blue-500/15'

    return (
        <div className="hidden lg:flex w-[480px] min-w-[480px] h-screen sticky top-0 flex-col p-12 overflow-hidden bg-[#0A1525] border-r border-white/5 relative">
        {/* Glows */}
        <div className={`absolute w-96 h-96 rounded-full -bottom-24 -right-24 pointer-events-none blur-3xl ${isEmpresa ? 'bg-amber-500/10' : 'bg-blue-700/10'}`} />
        <div className={`absolute w-64 h-64 rounded-full top-20 -left-16 pointer-events-none blur-3xl ${isEmpresa ? 'bg-amber-500/5' : 'bg-emerald-500/5'}`} />
        {/* Subtle grid via pseudo – use a wrapper div with bg-[image] */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(59,130,246,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Logo */}
        <div className="relative z-10 mb-12 font-[Sora] text-[22px] font-extrabold text-white tracking-tight">
            Link<span className="text-blue-500">Tin</span>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
            <p className={`text-[11px] font-bold tracking-[.2em] uppercase mb-3.5 ${isEmpresa ? 'text-amber-500' : 'text-blue-400'}`}>
            {isEmpresa ? 'Para empresas' : 'Plataforma de networking'}
            </p>
            <h2 className="font-[Sora] text-[36px] font-extrabold tracking-tight leading-[1.1] mb-4 text-white">
            {isEmpresa ? (
                <>Encuentra el<br /><span className="text-amber-400">talento</span><br />que necesitas.</>
            ) : (
                <>Tu carrera,<br /><span className="text-blue-400">tu match,</span><br />tu historia.</>
            )}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[340px] mb-8">
            {isEmpresa
                ? 'Conecta con los mejores profesionales de tecnología en Colombia y LATAM con precisión de matching.'
                : 'Únete a miles de profesionales que ya encontraron su próximo paso profesional en LinkTin.'}
            </p>

            <div className="flex flex-col gap-2.5">
            {cards.map(c => (
                <div key={c.name} className={`bg-[#0D1B2A] border ${cardBorderCls} rounded-[14px] px-4 py-3.5 flex items-center gap-3`}>
                <div className={`w-10 h-10 ${c.rounded} bg-gradient-to-br ${c.gradFrom} ${c.gradTo} flex items-center justify-center font-[Sora] text-[13px] font-bold text-white flex-shrink-0`}>
                    {c.av}
                </div>
                <div className="flex-1">
                    <div className="font-[Sora] text-[13px] font-semibold text-white">{c.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{c.sub}</div>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${c.badgeCls}`}>{c.badge}</span>
                </div>
            ))}

            {isEmpresa && (
                <div className="mt-1 bg-gradient-to-r from-amber-500/10 to-amber-700/5 border border-amber-500/20 rounded-xl px-4 py-3 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 shadow-[0_0_8px_rgba(245,158,11,.5)]" />
                <span className="text-xs text-amber-600">
                    <span className="font-[Sora] font-bold text-amber-300">47 candidatos</span> en match disponibles hoy
                </span>
                </div>
            )}
            </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-6 pt-5 border-t border-white/5">
            {[
            { num: '50K+', lbl: 'Usuarios registrados' },
            { num: '98%',  lbl: 'Precisión del matching' },
            { num: '8.4K', lbl: 'Empleos conectados' },
            ].map(s => (
            <div key={s.num}>
                <div className="font-[Sora] text-xl font-bold text-white">{s.num}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">{s.lbl}</div>
            </div>
            ))}
        </div>
        </div>
    )
    }

    const SKILLS_CANDIDATO = ['React','Node.js','PostgreSQL','Python','Docker','AWS','Vue.js','TypeScript','MongoDB','GraphQL']
    const SKILLS_EMPRESA   = ['Desarrollo Frontend','Backend / APIs','DevOps / Cloud','Data Science','IA / ML','Diseño UX/UI','QA / Testing','Ciberseguridad','Mobile Dev','Gestión de Proyectos']

    export default function RegisterPage() {
    const { register } = useAuth()

    const [role,        setRole]        = useState('candidato')
    const isEmpresa = role === 'empresa'

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

    const toggleSkill = (s) =>
        setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

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

    /* ── Input helpers ── */
    const inputCls = (key) =>
        `w-full px-3.5 py-3 rounded-lg bg-slate-50 text-slate-900 text-sm outline-none placeholder:text-slate-300 transition-all duration-150 border ${
        focused[key]
            ? isEmpresa
            ? 'border-amber-600 ring-2 ring-amber-100'
            : 'border-blue-700 ring-2 ring-blue-100'
            : 'border-slate-200'
        }`

    const fProps = (key) => ({
        onFocus: () => setFocused(p => ({ ...p, [key]: true })),
        onBlur:  () => setFocused(p => ({ ...p, [key]: false })),
        className: inputCls(key),
    })

    const selectCls = `w-full px-3.5 py-3 rounded-lg bg-slate-50 text-slate-900 text-sm outline-none appearance-none cursor-pointer border ${
        isEmpresa ? 'border-amber-400/50' : 'border-slate-200'
    }`

    /* ── Accent shortcuts ── */
    const accentText   = isEmpresa ? 'text-amber-600'  : 'text-blue-700'
    const accentTabBg  = isEmpresa
        ? 'bg-amber-600 shadow-[0_2px_8px_rgba(217,119,6,.4)]'
        : 'bg-blue-700 shadow-[0_2px_8px_rgba(29,78,216,.4)]'
    const accentSubmit = isEmpresa
        ? 'bg-amber-600 hover:bg-amber-700 shadow-[0_4px_14px_rgba(217,119,6,.4)]'
        : 'bg-blue-700 hover:bg-blue-800 shadow-[0_4px_14px_rgba(29,78,216,.4)]'
    const accentCheck  = isEmpresa ? 'bg-amber-600 border-amber-600' : 'bg-blue-700 border-blue-700'

    /* ── Sub-components ── */
    const SectionLabel = ({ children }) => (
        <span className="block text-[10px] text-slate-400 uppercase tracking-[.2em] font-bold mt-5 mb-3 pt-5 border-t border-slate-100">
        {children}
        </span>
    )

    const Label = ({ children }) => (
        <label className="block text-xs text-slate-500 font-semibold mb-1.5">{children}</label>
    )

    const CheckMark = () => (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 text-sm">✓</span>
    )

    return (
        <div className="flex h-screen bg-white text-slate-900 overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap'); input::placeholder{color:#CBD5E1;} select option{background:#fff;color:#0F172A;}`}</style>

        <LeftPanel role={role} />

        {/* ── Right scroll panel ── */}
        <div className="flex-1 overflow-y-auto flex justify-center px-6 py-10 md:px-12 relative bg-white">

            {/* Soft glow */}
            <div className={`fixed w-[600px] h-[500px] rounded-full top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl ${isEmpresa ? 'bg-amber-400/5' : 'bg-blue-400/5'}`} />

            <div className="relative z-10 w-full max-w-[520px]">

            {/* Tabs */}
            <div className="flex mb-7 p-1 rounded-xl bg-slate-100 border border-slate-200">
                <Link
                href="/auth/login"
                className="flex-1 py-2.5 text-center text-[13px] rounded-lg text-slate-400 no-underline flex items-center justify-center hover:text-slate-600 transition-colors"
                >
                Iniciar sesión
                </Link>
                <button
                className={`flex-1 py-2.5 text-center text-[13px] rounded-lg text-white font-semibold border-none cursor-pointer font-[Sora] ${accentTabBg}`}
                >
                Crear cuenta
                </button>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="font-[Sora] text-[28px] font-bold tracking-tight text-slate-900 mb-1.5">
                Crea tu cuenta
                </h1>
                <p className="text-sm text-slate-400">
                ¿Ya tienes cuenta?{' '}
                <Link href="/auth/login" className={`no-underline font-medium ${accentText}`}>
                    Inicia sesión aquí
                </Link>
                </p>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                { id: 'candidato', icon: '👤', title: 'Soy candidato', desc: 'Busco oportunidades laborales y quiero conectar con empresas.' },
                { id: 'empresa',   icon: '🏢', title: 'Soy empresa',   desc: 'Quiero publicar vacantes y encontrar el talento ideal para mi equipo.' },
                ].map(r => {
                const sel = role === r.id
                const cardCls = sel
                    ? r.id === 'empresa'
                    ? 'border-amber-600 bg-amber-50 shadow-[0_0_0_3px_rgba(217,119,6,.12)]'
                    : 'border-blue-700 bg-blue-50 shadow-[0_0_0_3px_rgba(29,78,216,.1)]'
                    : 'border-slate-200 bg-slate-50'
                const dotCls = sel
                    ? r.id === 'empresa'
                    ? 'bg-amber-600 shadow-[0_0_6px_rgba(217,119,6,.5)]'
                    : 'bg-blue-700 shadow-[0_0_6px_rgba(29,78,216,.5)]'
                    : 'hidden'
                return (
                    <button
                    key={r.id}
                    type="button"
                    onClick={() => { setRole(r.id); setSkills([]) }}
                    className={`rounded-xl p-4 border-[1.5px] ${cardCls} cursor-pointer text-left relative transition-all duration-150`}
                    >
                    {sel && <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${dotCls}`} />}
                    <div className="text-[22px] mb-2">{r.icon}</div>
                    <div className="font-[Sora] text-sm font-semibold text-slate-900 mb-1">{r.title}</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</div>
                    </button>
                )
                })}
            </div>

            <StepsIndicator role={role} />

            <form onSubmit={handleSubmit} noValidate>

                {/* ══ CANDIDATO ══ */}
                {!isEmpresa && (
                <>
                    <SectionLabel>Información personal</SectionLabel>

                    <div className="grid grid-cols-2 gap-3.5 mb-4">
                    <div>
                        <Label>Nombre</Label>
                        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Libardo" {...fProps('nombre')} />
                    </div>
                    <div>
                        <Label>Apellido</Label>
                        <input value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Acosta" {...fProps('apellido')} />
                    </div>
                    </div>

                    <div className="mb-4">
                    <Label>Correo electrónico</Label>
                    <div className="relative">
                        <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} placeholder="usuario@email.com" {...fProps('email')} className={inputCls('email') + ' pr-9'} />
                        {email && <CheckMark />}
                    </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 mb-4">
                    <div>
                        <Label>Contraseña</Label>
                        <div className="relative">
                        <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" {...fProps('pwd')} className={inputCls('pwd') + ' pr-9'} />
                        <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 flex">
                            <EyeIcon open={showPwd} />
                        </button>
                        </div>
                        {password && (
                        <div className="mt-2 flex gap-1 items-center">
                            {[1,2,3,4].map(i => (
                            <div key={i} className={`h-[3px] flex-1 rounded-sm ${i <= pwdStrength.score ? pwdStrength.barColor : 'bg-slate-200'}`} />
                            ))}
                            <span className={`text-[10px] ml-1.5 ${pwdStrength.textColor}`}>{pwdStrength.label}</span>
                        </div>
                        )}
                    </div>
                    <div>
                        <Label>Confirmar contraseña</Label>
                        <div className="relative">
                        <input type={showConf ? 'text' : 'password'} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="••••••••" {...fProps('conf')} className={inputCls('conf') + ' pr-9'} />
                        <button type="button" onClick={() => setShowConf(!showConf)} className={`absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer flex ${pwdMatch ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {pwdMatch ? <span className="text-sm">✓</span> : <EyeIcon open={showConf} />}
                        </button>
                        </div>
                    </div>
                    </div>

                    <SectionLabel>Información profesional</SectionLabel>

                    <div className="grid grid-cols-2 gap-3.5 mb-4">
                    <div>
                        <Label>Título profesional</Label>
                        <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Full Stack Developer" {...fProps('titulo')} />
                    </div>
                    <div>
                        <Label>Ciudad</Label>
                        <input value={ciudad} onChange={e => setCiudad(e.target.value)} placeholder="Valledupar, Colombia" {...fProps('ciudad')} />
                    </div>
                    </div>

                    <label className="block text-xs text-slate-500 font-semibold mb-1.5">
                    Tus habilidades principales{' '}
                    <span className="text-slate-300 font-normal">(selecciona las que aplican)</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                    {SKILLS_CANDIDATO.map(s => (
                        <button key={s} type="button" onClick={() => toggleSkill(s)}
                        className={`px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-150 border-[1.5px] ${
                            skills.includes(s)
                            ? 'border-blue-700 text-blue-700 bg-blue-50 font-semibold'
                            : 'border-slate-200 text-slate-400 bg-slate-50'
                        }`}>
                        {s}
                        </button>
                    ))}
                    </div>
                </>
                )}

                {/* ══ EMPRESA ══ */}
                {isEmpresa && (
                <>
                    <SectionLabel>Datos de la empresa</SectionLabel>

                    <div className="grid grid-cols-2 gap-3.5 mb-4">
                    <div>
                        <Label>Nombre de la empresa</Label>
                        <input value={empNombre} onChange={e => setEmpNombre(e.target.value)} placeholder="TechNova S.A.S" {...fProps('empNombre')} />
                    </div>
                    <div>
                        <Label>NIT / RUT</Label>
                        <div className="relative">
                        <input value={nit} onChange={e => setNit(e.target.value)} placeholder="900.123.456-7" {...fProps('nit')} className={inputCls('nit') + ' pr-9'} />
                        {nit && <CheckMark />}
                        </div>
                    </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 mb-4">
                    <div>
                        <Label>Sector / Industria</Label>
                        <select value={sector} onChange={e => setSector(e.target.value)} className={selectCls}>
                        {['Tecnología e Innovación','Finanzas','Salud','Educación','Retail','Manufactura','Consultoría'].map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                    <div>
                        <Label>Tamaño de la empresa</Label>
                        <select value={tamano} onChange={e => setTamano(e.target.value)} className={selectCls}>
                        {['1 – 10 empleados','11 – 50 empleados','51 – 200 empleados','201 – 500 empleados','500+ empleados'].map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 mb-4">
                    <div>
                        <Label>Ciudad / País</Label>
                        <input value={ciudadEmp} onChange={e => setCiudadEmp(e.target.value)} placeholder="Valledupar, Colombia" {...fProps('ciudadEmp')} />
                    </div>
                    <div>
                        <Label>Sitio web</Label>
                        <div className="relative">
                        <input value={sitioWeb} onChange={e => setSitioWeb(e.target.value)} placeholder="www.miempresa.co" {...fProps('sitioWeb')} className={inputCls('sitioWeb') + ' pr-9'} />
                        {sitioWeb && <CheckMark />}
                        </div>
                    </div>
                    </div>

                    <SectionLabel>Datos del responsable</SectionLabel>

                    <div className="grid grid-cols-2 gap-3.5 mb-4">
                    <div>
                        <Label>Nombre del responsable</Label>
                        <input value={responsable} onChange={e => setResponsable(e.target.value)} placeholder="María Fernanda" {...fProps('responsable')} />
                    </div>
                    <div>
                        <Label>Cargo</Label>
                        <input value={cargo} onChange={e => setCargo(e.target.value)} placeholder="Head of Talent" {...fProps('cargo')} />
                    </div>
                    </div>

                    <div className="mb-4">
                    <Label>Correo corporativo</Label>
                    <div className="relative">
                        <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} placeholder="contacto@empresa.co" {...fProps('emailEmp')} className={inputCls('emailEmp') + ' pr-9'} />
                        {email && <CheckMark />}
                    </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 mb-4">
                    <div>
                        <Label>Contraseña</Label>
                        <div className="relative">
                        <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" {...fProps('pwdE')} className={inputCls('pwdE') + ' pr-9'} />
                        <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 flex">
                            <EyeIcon open={showPwd} />
                        </button>
                        </div>
                        {password && (
                        <div className="mt-2 flex gap-1 items-center">
                            {[1,2,3,4].map(i => (
                            <div key={i} className={`h-[3px] flex-1 rounded-sm ${i <= pwdStrength.score ? pwdStrength.barColor : 'bg-slate-200'}`} />
                            ))}
                            <span className={`text-[10px] ml-1.5 ${pwdStrength.textColor}`}>{pwdStrength.label}</span>
                        </div>
                        )}
                    </div>
                    <div>
                        <Label>Confirmar contraseña</Label>
                        <div className="relative">
                        <input type={showConf ? 'text' : 'password'} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="••••••••" {...fProps('confE')} className={inputCls('confE') + ' pr-9'} />
                        <button type="button" onClick={() => setShowConf(!showConf)} className={`absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer flex ${pwdMatch ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {pwdMatch ? <span className="text-sm">✓</span> : <EyeIcon open={showConf} />}
                        </button>
                        </div>
                    </div>
                    </div>

                    <label className="block text-xs text-slate-500 font-semibold mb-1.5">
                    Áreas de contratación{' '}
                    <span className="text-slate-300 font-normal">(selecciona las que aplican)</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                    {SKILLS_EMPRESA.map(s => (
                        <button key={s} type="button" onClick={() => toggleSkill(s)}
                        className={`px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-150 border-[1.5px] ${
                            skills.includes(s)
                            ? 'border-amber-600 text-amber-600 bg-amber-50 font-semibold'
                            : 'border-slate-200 text-slate-400 bg-slate-50'
                        }`}>
                        {s}
                        </button>
                    ))}
                    </div>
                </>
                )}

                {/* Terms */}
                <div className="flex items-start gap-2.5 mb-6">
                <button
                    type="button"
                    onClick={() => setTerms(!terms)}
                    className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center text-[9px] text-white cursor-pointer border-[1.5px] transition-colors ${terms ? accentCheck : 'bg-white border-slate-300'}`}
                >
                    {terms && '✓'}
                </button>
                <p className="text-xs text-slate-400 leading-relaxed m-0">
                    Acepto los{' '}
                    <Link href="#" className={`no-underline font-medium ${accentText}`}>Términos y Condiciones</Link>
                    {' '}y la{' '}
                    <Link href="#" className={`no-underline font-medium ${accentText}`}>Política de Privacidad</Link>{' '}
                    de LinkTin.{' '}
                    {isEmpresa
                    ? 'Autorizo el uso de los datos de mi empresa para el proceso de matching.'
                    : 'Entiendo que mis datos serán usados para mejorar la precisión del matching.'}
                </p>
                </div>

                {/* Error */}
                {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                </div>
                )}

                {/* Submit */}
                <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl border-none text-white font-[Sora] text-[15px] font-semibold cursor-pointer mb-4 transition-colors ${accentSubmit} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                {loading ? 'Creando cuenta…' : isEmpresa ? 'Registrar empresa en LinkTin →' : 'Crear mi cuenta en LinkTin →'}
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-300">o regístrate con</span>
                <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-2.5 pb-10">
                {[
                { icon: <GoogleIcon />,   label: 'Continuar con Google'   },
                { icon: <LinkedInIcon />, label: 'Continuar con LinkedIn' },
                ].map(btn => (
                <button
                    key={btn.label}
                    type="button"
                    className="flex items-center justify-center gap-2 py-[11px] rounded-lg border border-slate-200 bg-white text-slate-500 text-[13px] cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                >
                    {btn.icon}
                    {btn.label}
                </button>
                ))}
            </div>

            </div>
        </div>
        </div>
    )
    }
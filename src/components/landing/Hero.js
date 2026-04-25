    'use client'

    import Link from 'next/link'

    export default function Hero() {
    return (
        <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '100px 48px 80px',
        background: '#FFFFFF',
        position: 'relative', overflow: 'hidden',
        }}>
        {/* Subtle background decoration */}
        <div style={{
            position: 'absolute', top: -100, right: -100,
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
        }} />
        <div style={{
            position: 'absolute', bottom: -50, left: -100,
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(29,78,216,0.04) 0%, transparent 65%)',
            pointerEvents: 'none',
        }} />

        <div style={{
            maxWidth: 1200, margin: '0 auto', width: '100%',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 80, alignItems: 'center',
        }}>
            {/* Left — copy */}
            <div>
            {/* Badge */}
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#EFF6FF', border: '1px solid #BFDBFE',
                borderRadius: 20, padding: '6px 14px', marginBottom: 28,
            }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1D4ED8' }} />
                <span style={{
                fontSize: 12, fontWeight: 600, color: '#1D4ED8',
                fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.3,
                }}>
                Matching inteligente con IA
                </span>
            </div>

            <h1 style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 52, fontWeight: 800,
                lineHeight: 1.08, letterSpacing: -2,
                color: '#0F172A', marginBottom: 20,
            }}>
                Conectando talento<br />
                con oportunidades<br />
                de{' '}
                <span style={{
                color: '#1D4ED8',
                position: 'relative', display: 'inline-block',
                }}>
                forma inteligente
                <svg viewBox="0 0 200 12" style={{ position: 'absolute', bottom: -4, left: 0, width: '100%', height: 8 }}>
                    <path d="M2,8 Q50,2 100,8 Q150,14 198,6" stroke="#BFDBFE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
                </span>
            </h1>

            <p style={{
                fontSize: 16, color: '#64748B', lineHeight: 1.75,
                fontFamily: "'DM Sans', sans-serif",
                maxWidth: 460, marginBottom: 36,
            }}>
                Nuestro motor de emparejamiento basado en habilidades elimina el ruido.
                Encuentra el rol perfecto o el candidato ideal mediante algoritmos de precisión técnica.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 44 }}>
                <Link href="/auth/register" style={{
                textDecoration: 'none', padding: '13px 28px',
                background: '#1D4ED8', color: '#fff',
                borderRadius: 10, fontSize: 15, fontWeight: 600,
                fontFamily: "'Sora', sans-serif",
                boxShadow: '0 4px 16px rgba(29,78,216,0.35)',
                transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1e40af'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1D4ED8'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                Registrarme como Profesional
                </Link>
                <Link href="/auth/register?role=empresa" style={{
                textDecoration: 'none', padding: '13px 24px',
                border: '1.5px solid #E2E8F0', color: '#0F172A',
                borderRadius: 10, fontSize: 15, fontWeight: 600,
                fontFamily: "'Sora', sans-serif", background: '#fff',
                transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1D4ED8'; e.currentTarget.style.color = '#1D4ED8' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#0F172A' }}
                >
                Contratar Talento
                </Link>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Avatars */}
                <div style={{ display: 'flex' }}>
                {['#1D4ED8','#059669','#D97706','#7C3AED'].map((bg, i) => (
                    <div key={i} style={{
                    width: 32, height: 32, borderRadius: '50%', background: bg,
                    border: '2px solid #fff', marginLeft: i === 0 ? 0 : -10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#fff',
                    fontFamily: "'Sora', sans-serif",
                    }}>
                    {['LA','SM','CR','MF'][i]}
                    </div>
                ))}
                </div>
                <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                    {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ color: '#FBBF24', fontSize: 13 }}>★</span>
                    ))}
                </div>
                <span style={{ fontSize: 13, color: '#64748B', fontFamily: "'DM Sans', sans-serif" }}>
                    <strong style={{ color: '#0F172A' }}>50.000+</strong> profesionales ya conectados
                </span>
                </div>
            </div>
            </div>

            {/* Right — visual */}
            <div style={{ position: 'relative' }}>
            {/* Main card */}
            <div style={{
                background: '#0A1525',
                borderRadius: 20, overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(15,23,42,0.2)',
                padding: 28,
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                    <div style={{ fontSize: 11, color: '#3B82F6', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
                    IA Matching Engine
                    </div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#fff' }}>
                    Candidatos recomendados
                    </div>
                </div>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} />
                    <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>En vivo</span>
                </div>
                </div>

                {/* Candidate cards */}
                {[
                { av: 'LA', bg: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', name: 'Libardo Acosta', role: 'Full Stack Developer', match: 98, skills: ['React', 'Node.js', 'AWS'] },
                { av: 'SM', bg: 'linear-gradient(135deg,#059669,#10B981)', name: 'Sara Martínez',  role: 'UX/UI Designer',       match: 95, skills: ['Figma', 'Vue.js', 'CSS'] },
                { av: 'CR', bg: 'linear-gradient(135deg,#7C3AED,#A78BFA)', name: 'Carlos Rivas',   role: 'Data Engineer',        match: 92, skills: ['Python', 'SQL', 'Spark'] },
                ].map((c, i) => (
                <div key={c.name} style={{
                    background: '#0D1B2A', borderRadius: 14, padding: '14px 16px',
                    marginBottom: i < 2 ? 10 : 0,
                    border: i === 0 ? '1px solid rgba(59,130,246,0.3)' : '0.5px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', gap: 14,
                }}>
                    <div style={{
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    background: c.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontFamily: "'Sora', sans-serif",
                    fontSize: 14, fontWeight: 700, color: '#fff',
                    }}>{c.av}</div>
                    <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600, color: '#fff' }}>{c.name}</span>
                        <span style={{
                        fontSize: 12, fontWeight: 700, color: '#10B981',
                        background: 'rgba(16,185,129,0.1)', padding: '2px 8px',
                        borderRadius: 10, border: '0.5px solid rgba(16,185,129,0.2)',
                        }}>{c.match}%</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#475569', marginBottom: 8 }}>{c.role}</div>
                    <div style={{ display: 'flex', gap: 5 }}>
                        {c.skills.map(s => (
                        <span key={s} style={{
                            fontSize: 10, padding: '2px 7px', borderRadius: 20,
                            background: 'rgba(59,130,246,0.1)', color: '#93C5FD',
                            border: '0.5px solid rgba(59,130,246,0.2)',
                        }}>{s}</span>
                        ))}
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Floating match badge */}
            <div style={{
                position: 'absolute', top: -16, right: -16,
                background: 'linear-gradient(135deg,#10B981,#059669)',
                borderRadius: 12, padding: '10px 16px',
                boxShadow: '0 8px 24px rgba(16,185,129,0.4)',
                fontFamily: "'Sora', sans-serif",
            }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Nuevo match</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>98%</div>
            </div>

            {/* Floating stat */}
            <div style={{
                position: 'absolute', bottom: -20, left: -20,
                background: '#fff', borderRadius: 12, padding: '12px 18px',
                boxShadow: '0 8px 32px rgba(15,23,42,0.12)',
                border: '1px solid #F1F5F9',
                display: 'flex', alignItems: 'center', gap: 10,
            }}>
                <div style={{ fontSize: 24 }}>⚡</div>
                <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#0F172A' }}>3 días</div>
                <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: "'DM Sans', sans-serif" }}>Tiempo prom. de match</div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
    }
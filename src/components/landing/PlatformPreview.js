    'use client'

    import Link from 'next/link'
    import { useEffect, useRef, useState } from 'react'

    function useInView(threshold = 0.15) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [threshold])
    return [ref, inView]
    }

    function ReputationSection() {
    const [ref, inView] = useInView()

    return (
        <div ref={ref} style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.6s ease',
        }}>
        <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 20, padding: '5px 12px', marginBottom: 20 }}>
            <span style={{ fontSize: 12 }}>✅</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#16A34A', fontFamily: "'DM Sans', sans-serif" }}>Reputación Verificada</span>
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: -1.5, color: '#0F172A', lineHeight: 1.15, marginBottom: 16 }}>
            Visualiza tu impacto<br />profesional
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif", marginBottom: 28 }}>
            En LinkTin, tu reputación no es solo un número. Nuestro sistema analiza las validaciones de habilidades,
            los proyectos completados con éxito y el feedback de tus colaboradores.
            </p>
            {[
            'Validación técnica mediante pruebas interactivas.',
            'Feedback 360° de empleadores y compañeros de equipo.',
            'Historial transparente de logros y contribuciones.',
            ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontSize: 10, color: '#1D4ED8' }}>✓</span>
                </div>
                <span style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
            </div>
            ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', border: '1px solid #F1F5F9', boxShadow: '0 4px 20px rgba(15,23,42,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⭐</div>
                <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Skill Score: Frontend</div>
                <div style={{ fontSize: 12, color: '#94A3B8', fontFamily: "'DM Sans', sans-serif" }}>Top 5% de la plataforma</div>
                </div>
            </div>
            <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '92%', background: 'linear-gradient(90deg, #1D4ED8, #3B82F6)', borderRadius: 3 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: "'DM Sans', sans-serif" }}>Score</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#1D4ED8', fontFamily: "'Sora', sans-serif" }}>92 / 100</span>
            </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', border: '1px solid #F1F5F9', boxShadow: '0 4px 20px rgba(15,23,42,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👍</div>
                <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Trust Index</div>
                <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= 4 ? '#FBBF24' : '#E2E8F0', fontSize: 13 }}>★</span>)}
                    <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 4, fontFamily: "'DM Sans', sans-serif" }}>4.9/5 · 42 reseñas</span>
                </div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Responsable', 'Proactivo', 'Experto técnico'].map(tag => (
                <span key={tag} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{tag}</span>
                ))}
            </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', borderRadius: 16, padding: '20px 24px', boxShadow: '0 8px 24px rgba(29,78,216,0.3)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32 }}>🎯</div>
            <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color: '#fff' }}>847</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: "'DM Sans', sans-serif" }}>Candidatos en match disponibles ahora</div>
            </div>
            </div>
        </div>
        </div>
    )
    }

    export default function PlatformPreview() {
    const [ref, inView] = useInView()

    return (
        <section style={{ padding: '96px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div ref={ref} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 96,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.6s ease',
            }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 340, background: 'linear-gradient(145deg, #0A1525 0%, #1D4ED8 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32, boxShadow: '0 20px 60px rgba(29,78,216,0.3)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,21,37,0.95) 0%, rgba(10,21,37,0.3) 100%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(59,130,246,0.15)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'inline-block', background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20, padding: '4px 12px', marginBottom: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#93C5FD', fontFamily: "'DM Sans', sans-serif", letterSpacing: 1 }}>PARA PROFESIONALES</span>
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>Encuentra tu próximo<br />gran desafío</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
                    Basado en lo que realmente sabes hacer. Nuestro matching IA conecta tu stack con empresas que lo valoran.
                </p>
                <Link href="/auth/register" style={{ display: 'inline-block', textDecoration: 'none', padding: '11px 22px', borderRadius: 9, background: '#fff', color: '#1D4ED8', fontSize: 14, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>
                    Explorar Vacantes →
                </Link>
                </div>
            </div>

            <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 340, background: 'linear-gradient(145deg, #0A1525 0%, #0F4C75 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32, boxShadow: '0 20px 60px rgba(15,23,42,0.25)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,21,37,0.95) 0%, rgba(10,21,37,0.3) 100%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(245,158,11,0.12)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'inline-block', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 20, padding: '4px 12px', marginBottom: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#FCD34D', fontFamily: "'DM Sans', sans-serif", letterSpacing: 1 }}>PARA EMPRESAS</span>
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>Construye el equipo<br />de tus sueños</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
                    Con talento validado y compatible. Reduce el tiempo de contratación de semanas a días.
                </p>
                <Link href="/auth/register?role=empresa" style={{ display: 'inline-block', textDecoration: 'none', padding: '11px 22px', borderRadius: 9, border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Sora', sans-serif", background: 'rgba(255,255,255,0.08)' }}>
                    Publicar Oferta →
                </Link>
                </div>
            </div>
            </div>

            <ReputationSection />
        </div>
        </section>
    )
    }
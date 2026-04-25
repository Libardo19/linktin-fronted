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

    export default function CTA() {
    const [ref, inView] = useInView()

    return (
        <section style={{
        padding: '96px 48px',
        background: '#0A1525',
        position: 'relative', overflow: 'hidden',
        }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,78,216,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, right: 100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div ref={ref} style={{
            maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
        }}>
            <div style={{
            display: 'inline-block', background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20,
            padding: '5px 14px', marginBottom: 24,
            }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#93C5FD', fontFamily: "'DM Sans', sans-serif" }}>
                ¿Listo para empezar?
            </span>
            </div>

            <h2 style={{
            fontFamily: "'Sora', sans-serif", fontSize: 44,
            fontWeight: 800, letterSpacing: -2, color: '#fff',
            lineHeight: 1.1, marginBottom: 18,
            }}>
            Únete a la red profesional<br />del futuro
            </h2>

            <p style={{
            fontSize: 16, color: '#94A3B8', lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif", marginBottom: 40,
            maxWidth: 500, margin: '0 auto 40px',
            }}>
            Miles de profesionales ya están impulsando sus carreras mediante nuestra inteligencia de red.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 40 }}>
            <Link href="/auth/register" style={{
                textDecoration: 'none', padding: '14px 32px',
                background: '#1D4ED8', color: '#fff',
                borderRadius: 10, fontSize: 15, fontWeight: 700,
                fontFamily: "'Sora', sans-serif",
                boxShadow: '0 4px 20px rgba(29,78,216,0.5)',
            }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1e40af'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1D4ED8'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
                Empezar gratis hoy
            </Link>
            <Link href="#" style={{
                textDecoration: 'none', padding: '14px 28px',
                border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)',
                borderRadius: 10, fontSize: 15, fontWeight: 600,
                fontFamily: "'Sora', sans-serif", background: 'rgba(255,255,255,0.05)',
            }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            >
                Ver demo
            </Link>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['🔒 Sin tarjeta requerida', '⚡ Setup en 2 minutos', '✅ Gratis para candidatos'].map(badge => (
                <span key={badge} style={{ fontSize: 13, color: '#64748B', fontFamily: "'DM Sans', sans-serif" }}>
                {badge}
                </span>
            ))}
            </div>
        </div>
        </section>
    )
    }
    'use client'

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

    const features = [
    { icon: '🧠', title: 'Matching por Habilidades', desc: 'Olvídate de las búsquedas manuales infinitas. Nuestro sistema conecta tus habilidades específicas con las necesidades reales de las empresas.' },
    { icon: '📊', title: 'Puntuación de Compatibilidad', desc: 'Visualiza tu nivel de afinidad con cada oferta de trabajo mediante puntuaciones dinámicas basadas en experiencia y aptitudes técnicas.' },
    { icon: '💬', title: 'Mensajería en Tiempo Real', desc: 'Comunicación fluida y directa. Conecta con reclutadores y líderes de equipo al instante sin fricciones innecesarias.' },
    { icon: '🔍', title: 'Búsqueda Avanzada con IA', desc: 'Filtros inteligentes que aprenden de tus preferencias. Cuanto más usas LinkTin, mejores son las recomendaciones.' },
    { icon: '✅', title: 'Reputación Verificada', desc: 'Perfiles con validación técnica, feedback 360° y historial transparente de logros para generar confianza real.' },
    { icon: '🚀', title: 'Onboarding Exprés', desc: 'En menos de 5 minutos tu perfil está listo. Nuestro asistente IA te guía paso a paso para maximizar tu visibilidad.' },
    ]

    function FeatureCard({ feature, delay }) {
    const [ref, inView] = useInView()
    const [hovered, setHovered] = useState(false)

    return (
        <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
            background: '#fff',
            border: hovered ? '1.5px solid #BFDBFE' : '1px solid #F1F5F9',
            borderRadius: 16, padding: '28px 24px',
            boxShadow: hovered ? '0 8px 32px rgba(29,78,216,0.10)' : '0 1px 4px rgba(15,23,42,0.05)',
            cursor: 'default',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, border-color 0.2s, box-shadow 0.2s`,
        }}
        >
        <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: hovered ? '#EFF6FF' : '#F8FAFC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, marginBottom: 16,
        }}>
            {feature.icon}
        </div>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>
            {feature.title}
        </h3>
        <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
            {feature.desc}
        </p>
        </div>
    )
    }

    export default function ValuePropositions() {
    const [ref, inView] = useInView()

    return (
        <section style={{ padding: '96px 48px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div ref={ref} style={{
            textAlign: 'center', marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.6s ease',
            }}>
            <div style={{
                display: 'inline-block', background: '#EFF6FF',
                border: '1px solid #BFDBFE', borderRadius: 20,
                padding: '5px 14px', marginBottom: 16,
            }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8', fontFamily: "'DM Sans', sans-serif" }}>
                Por qué LinkTin
                </span>
            </div>
            <h2 style={{
                fontFamily: "'Sora', sans-serif", fontSize: 38,
                fontWeight: 800, letterSpacing: -1.5, color: '#0F172A',
                marginBottom: 14, lineHeight: 1.15,
            }}>
                Potencia tu carrera con LinkTin
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', maxWidth: 520, margin: '0 auto', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                Tecnología de vanguardia para la próxima generación de profesionales.
            </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {features.map((f, i) => (
                <FeatureCard key={f.title} feature={f} delay={i * 0.1} />
            ))}
            </div>
        </div>
        </section>
    )
    }
    'use client'

    import Link from 'next/link'
    import { useEffect, useRef, useState } from 'react'
    import { Lock, Zap, CheckCircle2 } from 'lucide-react'

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
        <section className="py-24 px-12 bg-[#0A1525] relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-500/20 pointer-events-none" />
        <div className="absolute -bottom-12 right-24 w-[300px] h-[300px] rounded-full bg-blue-500/10 pointer-events-none" />

        <div ref={ref} className="max-w-xl mx-auto text-center relative z-10 transition-all duration-700" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(6)' }}>
            <div className="inline-block bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-blue-300">¿Listo para empezar?</span>
            </div>

            <h2 className="text-4xl font-extrabold text-white font-sora leading-tight mb-4">
            Únete a la red profesional<br />del futuro
            </h2>

            <p className="text-base text-slate-400 leading-relaxed mb-10 max-w-[500px] mx-auto">
            Miles de profesionales ya están impulsando sus carreras mediante nuestra inteligencia de red.
            </p>

            <div className="flex gap-3.5 justify-center mb-10">
            <Link href="/auth/register" className="no-underline px-8 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold font-sora shadow-xl shadow-blue-500/50 hover:bg-blue-700 hover:-translate-y-0.5 transition">
                Empezar gratis hoy
            </Link>
            <Link href="#" className="no-underline px-7 py-3.5 border border-white/20 text-white/80 rounded-xl text-sm font-semibold font-sora bg-white/5 hover:border-white/40 hover:text-white transition">
                Ver demo
            </Link>
            </div>

            <div className="flex justify-center gap-8 flex-wrap">
            {[
                { icon: <Lock size={14} />, text: 'Sin tarjeta requerida' },
                { icon: <Zap size={14} />, text: 'Setup en 2 minutos' },
                { icon: <CheckCircle2 size={14} />, text: 'Gratis para candidatos' },
            ].map((badge) => (
                <span key={badge.text} className="text-sm text-slate-500 flex items-center gap-1.5">
                    {badge.icon}
                    {badge.text}
                </span>
            ))}
            </div>
        </div>
        </section>
    )
    }
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
      className={`bg-white rounded-2xl p-7 cursor-default transition-all duration-500 ${hovered ? 'border border-blue-300 shadow-xl shadow-blue-500/10' : 'border border-slate-100 shadow-sm'}`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(6)' }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${hovered ? 'bg-blue-50' : 'bg-slate-50'}`}>
        {feature.icon}
      </div>
      <h3 className="font-sora text-base font-bold text-slate-900 mb-2.5">{feature.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
    </div>
  )
}

export default function ValuePropositions() {
  const [ref, inView] = useInView()

  return (
    <section className="py-24 px-12 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-16 transition-all duration-600" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(6)' }}>
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-blue-600">Por qué LinkTin</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 font-sora mb-3.5 leading-tight">
            Potencia tu carrera con LinkTin
          </h2>
          <p className="text-base text-slate-500 max-w-[520px] mx-auto leading-relaxed">
            Tecnología de vanguardia para la próxima generación de profesionales.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
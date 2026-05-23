'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Check, Star, ThumbsUp, Target } from 'lucide-react'

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
    <div ref={ref} className="grid grid-cols-2 gap-20 items-center transition-all duration-600" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(6)' }}>
      <div>
        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 mb-5">
          <CheckCircle2 size={16} className="text-green-600" />
          <span className="text-xs font-semibold text-green-600">Reputación Verificada</span>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 font-sora mb-4 leading-tight">
          Visualiza tu impacto<br />profesional
        </h2>
        <p className="text-base text-slate-500 leading-relaxed mb-7">
          En LinkTin, tu reputación no es solo un número. Nuestro sistema analiza las validaciones de habilidades,
          los proyectos completados con éxito y el feedback de tus colaboradores.
        </p>
        {[
          'Validación técnica mediante pruebas interactivas.',
          'Feedback 360° de empleadores y compañeros de equipo.',
          'Historial transparente de logros y contribuciones.',
        ].map(item => (
          <div key={item} className="flex items-start gap-2.5 mb-3">
            <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={14} className="text-blue-600" />
            </div>
            <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg">
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center"><Star size={20} className="text-blue-600 fill-blue-600" /></div>
            <div>
              <div className="font-sora text-sm font-bold text-slate-900">Skill Score: Frontend</div>
              <div className="text-xs text-slate-400">Top 5% de la plataforma</div>
            </div>
          </div>
          <div className="h-1.5 bg-slate-100 rounded overflow-hidden">
            <div className="h-full w-[92%] bg-gradient-to-r from-blue-600 to-blue-500 rounded" />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-slate-400">Score</span>
            <span className="text-xs font-bold text-blue-600 font-sora">92 / 100</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center"><ThumbsUp size={20} className="text-amber-600" /></div>
            <div>
              <div className="font-sora text-sm font-bold text-slate-900">Trust Index</div>
                <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className={`${i <= 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                <span className="text-xs text-slate-400 ml-1">4.9/5 · 42 reseñas</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {['Responsable', 'Proactivo', 'Experto técnico'].map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 font-medium">{tag}</span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-4">
            <Target size={32} className="text-white" />
            <div>
              <div className="font-sora text-2xl font-bold text-white">847</div>
              <div className="text-sm text-white/70">Candidatos en match disponibles ahora</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PlatformPreview() {
  const [ref, inView] = useInView()

  return (
    <section className="py-24 px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid grid-cols-2 gap-6 mb-24 transition-all duration-600" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(6)' }}>
          <div className="rounded-2xl overflow-hidden relative min-h-[340px] from-[#0A1525] to-blue-600 flex flex-col justify-end p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1525]/95 to-[#0a1525]/30 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-[220px] h-[220px] rounded-full bg-blue-500/15 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-block bg-blue-500/20 border border-blue-500/30 rounded-full px-3 py-1 mb-4">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Para Profesionales</span>
              </div>
              <h3 className="font-sora text-2xl font-bold text-white mb-2.5 leading-tight">Encuentra tu próximo<br />gran desafío</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-6">
                Basado en lo que realmente sabes hacer. Nuestro matching IA conecta tu stack con empresas que lo valoran.
              </p>
              <Link href="/auth/register" className="inline-block no-underline px-5 py-2.5 rounded-lg bg-white text-blue-600 text-sm font-bold font-sora">
                Explorar Vacantes →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden relative min-h-[340px] from-[#0A1525] to-[#0F4C75] flex flex-col justify-end p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1525]/95 to-[#0a1525]/30 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-[220px] h-[220px] rounded-full bg-amber-500/12 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-block bg-amber-500/15 border border-amber-500/25 rounded-full px-3 py-1 mb-4">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Para Empresas</span>
              </div>
              <h3 className="font-sora text-2xl font-bold text-white mb-2.5 leading-tight">Construye el equipo<br />de tus sueños</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-6">
                Con talento validado y compatible. Reduce el tiempo de contratación de semanas a días.
              </p>
              <Link href="/auth/register?role=empresa" className="inline-block no-underline px-5 py-2.5 rounded-lg border border-white/30 text-white text-sm font-bold font-sora bg-white/8 hover:bg-white/15 transition">
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
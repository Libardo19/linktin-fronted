'use client'

import Link from 'next/link'
import { Star, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-12 py-24 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[700px] h-[700px] rounded-full bg-blue-500/10 pointer-events-none" />
      <div className="absolute -bottom-12 -left-24 w-[500px] h-[500px] rounded-full bg-blue-500/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-7">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold text-blue-600">Matching inteligente con IA</span>
          </div>

          <h1 className="text-5xl font-extrabold text-slate-900 font-sora leading-tight mb-5">
            Conectando talento<br />
            con oportunidades<br />
            de{' '}
            <span className="text-blue-600 relative">
              forma inteligente
              <svg viewBox="0 0 200 12" className="absolute -bottom-1 left-0 w-full h-2">
                <path d="M2,8 Q50,2 100,8 Q150,14 198,6" stroke="#BFDBFE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-base text-slate-500 leading-relaxed max-w-[460px] mb-9">
            Nuestro motor de emparejamiento basado en habilidades elimina el ruido.
            Encuentra el rol perfecto o el candidato ideal mediante algoritmos de precisión técnica.
          </p>

          <div className="flex gap-3.5 items-center mb-11">
            <Link href="/auth/register" className="no-underline px-7 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-semibold font-sora shadow-lg shadow-blue-500/40 hover:bg-blue-700 hover:-translate-y-0.5 transition">
              Registrarme como Profesional
            </Link>
            <Link href="/auth/register?role=empresa" className="no-underline px-6 py-3.5 border border-slate-200 text-slate-900 rounded-xl text-sm font-semibold font-sora bg-white hover:border-blue-600 hover:text-blue-600 transition">
              Contratar Talento
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex">
              {['#1D4ED8','#059669','#D97706','#7C3AED'].map((bg, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-xs font-bold text-white" style={{ background: bg }}>
                  {['LA','SM','CR','MF'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-500">
                <strong className="text-slate-900">50.000+</strong> profesionales ya conectados
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#0A1525] rounded-2xl overflow-hidden shadow-2xl p-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-1">IA Matching Engine</div>
                <div className="text-base font-bold text-white font-sora">Candidatos recomendados</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/60" />
                <span className="text-xs text-emerald-500 font-semibold">En vivo</span>
              </div>
            </div>

            {[
              { av: 'LA', bg: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', name: 'Libardo Acosta', role: 'Full Stack Developer', match: 98, skills: ['React', 'Node.js', 'AWS'] },
              { av: 'SM', bg: 'linear-gradient(135deg,#059669,#10B981)', name: 'Sara Martínez', role: 'UX/UI Designer', match: 95, skills: ['Figma', 'Vue.js', 'CSS'] },
              { av: 'CR', bg: 'linear-gradient(135deg,#7C3AED,#A78BFA)', name: 'Carlos Rivas', role: 'Data Engineer', match: 92, skills: ['Python', 'SQL', 'Spark'] },
            ].map((c, i) => (
              <div key={c.name} className={`bg-[#0D1B2A] rounded-xl p-4 mb-2.5 last:mb-0 flex items-center gap-3.5 ${i === 0 ? 'border border-blue-500/40' : 'border border-white/[0.06]'}`}>
                <div className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-sora font-bold text-sm text-white" style={{ background: c.bg }}>{c.av}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sora text-sm font-semibold text-white">{c.name}</span>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{c.match}%</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">{c.role}</div>
                  <div className="flex gap-1">
                    {c.skills.map(s => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl px-4 py-2.5 shadow-xl">
            <div className="text-xs text-white/70 mb-0.5">Nuevo match</div>
            <div className="text-2xl font-extrabold text-white">98%</div>
          </div>

          <div className="absolute -bottom-5 -left-5 bg-white rounded-xl px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-2.5">
            <Zap size={24} className="text-amber-500" />
            <div>
              <div className="font-sora text-base font-bold text-slate-900">3 días</div>
              <div className="text-xs text-slate-400">Tiempo prom. de match</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
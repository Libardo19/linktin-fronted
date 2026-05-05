'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-12 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100' : 'bg-transparent border-b border-transparent'
    }`}>
      <Link href="/" className="no-underline mr-12">
        <span className="text-xl font-extrabold text-slate-900 font-sora">
          Link<span className="text-blue-600">Tin</span>
        </span>
      </Link>

      <div className="flex items-center gap-8 flex-1">
        {[
          { label: 'Buscar empleo', href: '#' },
          { label: 'Empresas', href: '#' },
          { label: 'Cómo funciona', href: '#' },
          { label: 'Precios', href: '#' },
        ].map((link) => (
          <Link key={link.label} href={link.href} className="no-underline text-sm text-slate-600 font-medium hover:text-slate-900 transition">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link href="/auth/login" className="no-underline text-sm font-medium text-slate-600 px-4 py-2 rounded-lg hover:text-slate-900 transition">
          Iniciar sesión
        </Link>
        <Link href="/auth/register" className="no-underline text-sm font-semibold text-white px-5 py-2.5 rounded-lg bg-blue-600 font-sora hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition">
          Únete gratis
        </Link>
      </div>
    </nav>
  )
}
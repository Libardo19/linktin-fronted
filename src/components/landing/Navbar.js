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
        <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #F1F5F9' : '1px solid transparent',
        transition: 'all .3s ease',
        display: 'flex', alignItems: 'center',
        padding: '0 48px',
        }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', marginRight: 48 }}>
            <span style={{
            fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800,
            letterSpacing: -0.5, color: '#0F172A',
            }}>
            Link<span style={{ color: '#1D4ED8' }}>Tin</span>
            </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flex: 1 }}>
            {[
            { label: 'Buscar empleo',  href: '#' },
            { label: 'Empresas',       href: '#' },
            { label: 'Cómo funciona',  href: '#' },
            { label: 'Precios',        href: '#' },
            ].map(link => (
            <Link key={link.label} href={link.href} style={{
                textDecoration: 'none', fontSize: 14, color: '#475569',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                transition: 'color .2s',
            }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
                {link.label}
            </Link>
            ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/auth/login" style={{
            textDecoration: 'none', fontSize: 14, fontWeight: 500,
            color: '#475569', padding: '8px 16px', borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif", transition: 'color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
            Iniciar sesión
            </Link>
            <Link href="/auth/register" style={{
            textDecoration: 'none', fontSize: 14, fontWeight: 600,
            color: '#fff', padding: '9px 20px', borderRadius: 8,
            background: '#1D4ED8', fontFamily: "'Sora', sans-serif",
            boxShadow: '0 2px 8px rgba(29,78,216,0.3)',
            transition: 'background .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1e40af'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(29,78,216,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1D4ED8'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(29,78,216,0.3)' }}
            >
            Únete gratis
            </Link>
        </div>
        </nav>
    )
    }
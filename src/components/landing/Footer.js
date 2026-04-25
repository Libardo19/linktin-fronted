    import Link from 'next/link'

    const links = {
    PRODUCTO:    ['Matching IA', 'Para Candidatos', 'Para Empresas', 'Precios'],
    SOPORTE:     ['Centro de ayuda', 'Contacto', 'Status', 'Comunidad'],
    LEGAL:       ['Privacidad', 'Términos', 'Cookies', 'Marca'],
    COMUNIDAD:   ['Blog', 'Casos de éxito', 'Webinars', 'API'],
    }

    export default function Footer() {
    return (
        <footer style={{
        background: '#060D18',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '64px 48px 32px',
        }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            {/* Top */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
            {/* Brand */}
            <div>
                <div style={{
                fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800,
                letterSpacing: -0.5, color: '#fff', marginBottom: 14,
                }}>
                Link<span style={{ color: '#3B82F6' }}>Tin</span>
                </div>
                <p style={{
                fontSize: 13, color: '#475569', lineHeight: 1.7,
                fontFamily: "'DM Sans', sans-serif", maxWidth: 240,
                }}>
                Redefiniendo la forma en que el talento preparado y las empresas encuentran excelencia.
                </p>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                {['in', 'tw', 'gh', 'ig'].map(social => (
                    <div key={social} style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#475569',
                    fontFamily: "'Sora', sans-serif", cursor: 'pointer',
                    }}>
                    {social}
                    </div>
                ))}
                </div>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([section, items]) => (
                <div key={section}>
                <div style={{
                    fontSize: 11, fontWeight: 700, color: '#334155',
                    textTransform: 'uppercase', letterSpacing: 1.5,
                    fontFamily: "'DM Sans', sans-serif", marginBottom: 18,
                }}>
                    {section}
                </div>
                {items.map(item => (
                    <Link key={item} href="#" style={{
                    display: 'block', fontSize: 13, color: '#475569',
                    textDecoration: 'none', marginBottom: 10,
                    fontFamily: "'DM Sans', sans-serif", transition: 'color .15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                    >
                    {item}
                    </Link>
                ))}
                </div>
            ))}
            </div>

            {/* Bottom */}
            <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 24, borderTop: '0.5px solid rgba(255,255,255,0.05)',
            }}>
            <span style={{ fontSize: 12, color: '#334155', fontFamily: "'DM Sans', sans-serif" }}>
                © 2024 LinkTin Corporation. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: 20 }}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <Link key={l} href="#" style={{
                    fontSize: 12, color: '#334155', textDecoration: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                }}>{l}</Link>
                ))}
            </div>
            </div>
        </div>
        </footer>
    )
    }
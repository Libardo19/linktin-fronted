    import Link from 'next/link'

    const links = {
    PRODUCTO: ['Matching IA', 'Para Candidatos', 'Para Empresas', 'Precios'],
    SOPORTE: ['Centro de ayuda', 'Contacto', 'Status', 'Comunidad'],
    LEGAL: ['Privacidad', 'Términos', 'Cookies', 'Marca'],
    COMUNIDAD: ['Blog', 'Casos de éxito', 'Webinars', 'API'],
    }

    export default function Footer() {
    return (
        <footer className="bg-[#060D18] border-t border-white/[0.06] px-12 py-16">
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-5 gap-12 mb-14">
            <div>
                <h1 className="text-2xl font-bold text-white font-sora mb-3">
                Link<span className="text-blue-500">Tin</span>
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed max-w-60 mb-5">
                Redefiniendo la forma en que el talento preparado y las empresas encuentran excelencia.
                </p>
                <div className="flex gap-2.5">
                {['in', 'tw', 'gh', 'ig'].map((social) => (
                    <button key={social} className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-white/[0.1] transition">
                    {social}
                    </button>
                ))}
                </div>
            </div>

            {Object.entries(links).map(([section, items]) => (
                <div key={section}>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-sans mb-4">
                    {section}
                </h3>
                {items.map((item) => (
                    <Link key={item} href="#" className="block text-sm text-slate-500 no-underline mb-2.5 hover:text-slate-400 transition">
                    {item}
                    </Link>
                ))}
                </div>
            ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
            <span className="text-xs text-slate-600">© 2024 LinkTin Corporation. All rights reserved.</span>
            <div className="flex gap-5">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
                <Link key={l} href="#" className="text-xs text-slate-600 no-underline hover:text-slate-400 transition">
                    {l}
                </Link>
                ))}
            </div>
            </div>
        </div>
        </footer>
    )
    }
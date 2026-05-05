    'use client'

    import { useState, useEffect } from 'react'
    import Navbar from './Navbar'
    import Hero from './Hero'
    import ValuePropositions from './ValuePropositions'
    import PlatformPreview from './PlatformPreview'
    import CTA from './CTA'
    import Footer from './Footer'

    export default function LandingPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>
        <Navbar />
        <main>
            <Hero />
            <ValuePropositions />
            <PlatformPreview />
            <CTA />
        </main>
        <Footer />
        </div>
    )
    }
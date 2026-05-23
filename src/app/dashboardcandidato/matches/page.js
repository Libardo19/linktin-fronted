'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { MatchCard } from '@/components/linktin/MatchCard'
import { MatchActions } from '@/components/linktin/MatchActions'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SlidersHorizontal, Building2, Sparkles } from 'lucide-react'
import { matchService } from '@/services/match.service'

export default function MatchesPage() {
  const [postulaciones, setPostulaciones] = useState([])
  const [misMatches, setMisMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postulacionesData, matchesData] = await Promise.all([
          matchService.feedCandidato(),
          matchService.misMatches(),
        ])
        setPostulaciones(postulacionesData)
        setMisMatches(matchesData)
      } catch (err) {
        setError('Error al cargar matches')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePass = async () => {
    const current = postulaciones[currentIndex]
    if (!current) return

    setSwipeDirection('left')
    try {
      await matchService.retirarLike(current.id_match)
    } catch (err) {
      console.error('Error al retirar like:', err)
    }
    setTimeout(() => {
      setSwipeDirection(null)
      setCurrentIndex(prev => prev + 1)
    }, 300)
  }

  const handleInterested = async () => {
    const current = postulaciones[currentIndex]
    if (!current) return

    setSwipeDirection('right')
    setTimeout(() => {
      setSwipeDirection(null)
      setCurrentIndex(prev => prev + 1)
    }, 300)
  }

  const handleSuperApply = async () => {
    const current = postulaciones[currentIndex]
    if (!current) return

    setSwipeDirection('right')
    setTimeout(() => {
      setSwipeDirection(null)
      setCurrentIndex(prev => prev + 1)
    }, 300)
  }

  const remainingMatches = postulaciones.length - currentIndex
  const currentJob = postulaciones[currentIndex]
  const nextJob = postulaciones[currentIndex + 1]

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="match" notificationCount={5} type="candidato" />
      
      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1.5 text-amber-500" />
            {remainingMatches} remaining matches today
          </Badge>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[380px] h-[580px]">
            {nextJob && (
              <>
                <div className="absolute inset-x-4 top-4 h-full">
                  <MatchCard
                    id={nextJob.id_match}
                    companyName={nextJob.oferta?.perfil_empresa?.nombre || 'Empresa'}
                    isVerified={true}
                    jobTitle={nextJob.oferta?.titulo || 'Oferta'}
                    location={nextJob.oferta?.direccion || 'No especificada'}
                    locationType={nextJob.oferta?.modalidad || 'No especificada'}
                    salaryRange={nextJob.oferta?.pago ? `$${nextJob.oferta.pago}` : 'A convenir'}
                    matchPercentage={Math.round(nextJob.compatibilidad)}
                    description={nextJob.oferta?.descripcion || ''}
                    requiredSkills={nextJob.oferta?.habilidades_ofertas?.map(h => h.habilidad?.nombre) || []}
                    matchingSkills={[]}
                    isTopCard={false}
                  />
                </div>
                <div className="absolute inset-x-2 top-2 h-full opacity-50">
                  <div className="w-full h-full bg-white rounded-lg shadow-md" />
                </div>
              </>
            )}

            {currentJob ? (
              <div className="absolute inset-0">
                <MatchCard
                  id={currentJob.id_match}
                  companyName={currentJob.oferta?.perfil_empresa?.nombre || 'Empresa'}
                  isVerified={true}
                  jobTitle={currentJob.oferta?.titulo || 'Oferta'}
                  location={currentJob.oferta?.direccion || 'No especificada'}
                  locationType={currentJob.oferta?.modalidad || 'No especificada'}
                  salaryRange={currentJob.oferta?.pago ? `$${currentJob.oferta.pago}` : 'A convenir'}
                  matchPercentage={Math.round(currentJob.compatibilidad)}
                  description={currentJob.oferta?.descripcion || ''}
                  requiredSkills={currentJob.oferta?.habilidades_ofertas?.map(h => h.habilidad?.nombre) || []}
                  matchingSkills={[]}
                  swipeDirection={swipeDirection}
                  isTopCard={true}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                <Building2 className="h-16 w-16 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">No more matches</h3>
                <p className="text-sm text-slate-500 text-center mt-2 px-8">
                  You've seen all available matches for today. Check back tomorrow!
                </p>
              </div>
            )}
          </div>

          {currentJob && (
            <MatchActions
              onPass={handlePass}
              onSuperApply={handleSuperApply}
              onInterested={handleInterested}
              onHoverPass={(hovering) => !swipeDirection && setSwipeDirection(hovering ? 'left' : null)}
              onHoverInterested={(hovering) => !swipeDirection && setSwipeDirection(hovering ? 'right' : null)}
            />
          )}

          <div className="flex items-center justify-center gap-8 mt-4 text-xs text-slate-500">
            <span>← Swipe left to pass</span>
            <span>Swipe right to apply →</span>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">My Matches</h3>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {misMatches.length > 0 ? misMatches.map((match) => (
              <button
                key={match.id_match}
                className="flex-shrink-0 relative group"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-emerald-500 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                  <Building2 className="h-8 w-8 text-slate-500" />
                </div>
                <p className="text-xs text-center mt-1 text-slate-500 truncate max-w-16">
                  {match.oferta?.perfil_empresa?.nombre || 'Empresa'}
                </p>
              </button>
            )) : (
              <p className="text-sm text-slate-400">No tienes matches aún</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
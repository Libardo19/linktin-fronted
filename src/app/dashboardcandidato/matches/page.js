'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { MatchCard } from '@/components/linktin/MatchCard'
import { MatchActions } from '@/components/linktin/MatchActions'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SlidersHorizontal, Building2, Sparkles, Star } from 'lucide-react'
import { matchService } from '@/services/match.service'
import { ofertaService } from '@/services/oferta.service'

export default function MatchesPage() {
  const [ofertasDisponibles, setOfertasDisponibles] = useState([])
  const [misMatches, setMisMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ofertasData, matchesData] = await Promise.all([
          ofertaService.getAll({ estado: 'activa' }),
          matchService.misMatches(),
        ])
        setOfertasDisponibles(ofertasData || [])
        setMisMatches(matchesData || [])
      } catch (err) {
        setError('Error al cargar ofertas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePass = () => {
    setSwipeDirection('left')
    setTimeout(() => {
      setSwipeDirection(null)
      setCurrentIndex(prev => prev + 1)
    }, 300)
  }

  const handleInterested = async () => {
    const current = ofertasDisponibles[currentIndex]
    if (!current) return

    setSwipeDirection('right')
    try {
      await matchService.darLike(current.id_ofertas)
    } catch (err) {
      console.error('Error al dar like:', err)
    }
    setTimeout(() => {
      setSwipeDirection(null)
      setCurrentIndex(prev => prev + 1)
    }, 300)
  }

  const remainingMatches = ofertasDisponibles.length - currentIndex
  const currentOferta = ofertasDisponibles[currentIndex]
  const nextOferta = ofertasDisponibles[currentIndex + 1]

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
      <GlobalNavigation activeTab="match" notificationCount={misMatches.length} type="candidato" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </Button>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1.5 text-amber-500" />
            {remainingMatches} ofertas disponibles
          </Badge>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[380px] h-[580px]">
            {nextOferta && (
              <div className="absolute inset-x-4 top-4 h-full">
                <MatchCard
                  id={nextOferta.id_ofertas}
                  companyName={nextOferta.perfil_empresa?.nombre || 'Empresa'}
                  isVerified={true}
                  jobTitle={nextOferta.titulo || 'Oferta'}
                  location={nextOferta.direccion || 'No especificada'}
                  locationType={nextOferta.modalidad || 'No especificada'}
                  salaryRange={nextOferta.pago ? `$${nextOferta.pago}` : 'A convenir'}
                  matchPercentage={85}
                  description={nextOferta.descripcion || ''}
                  requiredSkills={nextOferta.habilidades_ofertas?.map(h => h.habilidad?.nombre) || []}
                  matchingSkills={[]}
                  isTopCard={false}
                />
              </div>
            )}

            {currentOferta ? (
              <div className="absolute inset-0">
                <MatchCard
                  id={currentOferta.id_ofertas}
                  companyName={currentOferta.perfil_empresa?.nombre || 'Empresa'}
                  isVerified={true}
                  jobTitle={currentOferta.titulo || 'Oferta'}
                  location={currentOferta.direccion || 'No especificada'}
                  locationType={currentOferta.modalidad || 'No especificada'}
                  salaryRange={currentOferta.pago ? `$${currentOferta.pago}` : 'A convenir'}
                  matchPercentage={85}
                  description={currentOferta.descripcion || ''}
                  requiredSkills={currentOferta.habilidades_ofertas?.map(h => h.habilidad?.nombre) || []}
                  matchingSkills={[]}
                  swipeDirection={swipeDirection}
                  isTopCard={true}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                <Building2 className="h-16 w-16 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">No hay más ofertas</h3>
                <p className="text-sm text-slate-500 text-center mt-2 px-8">
                  Has visto todas las ofertas disponibles. ¡Vuelve pronto para más!
                </p>
              </div>
            )}
          </div>

          {currentOferta && (
            <MatchActions
              onPass={handlePass}
              onInterested={handleInterested}
              onHoverPass={(hovering) => !swipeDirection && setSwipeDirection(hovering ? 'left' : null)}
              onHoverInterested={(hovering) => !swipeDirection && setSwipeDirection(hovering ? 'right' : null)}
            />
          )}

          <div className="flex items-center justify-center gap-8 mt-4 text-xs text-slate-500">
            <span>← Desliza para pasar</span>
            <span>Desliza para aplicar →</span>
          </div>
        </div>

        {misMatches.length > 0 && (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Mis Matches</h3>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {misMatches.map((match) => (
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
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

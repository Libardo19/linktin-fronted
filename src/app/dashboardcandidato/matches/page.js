'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { MatchCard } from '@/components/linktin/MatchCard'
import { MatchActions } from '@/components/linktin/MatchActions'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  SlidersHorizontal,
  Building2,
  Sparkles,
  Search,
  ChevronRight,
  Briefcase,
} from 'lucide-react'
import { matchService } from '@/services/match.service'
import { ofertaService } from '@/services/oferta.service'
import { recommendationService } from '@/services/recommendation.service'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const SWIPE_THRESHOLD = 100

export default function MatchesPage() {
  const { usuario } = useAuth()
  const [ofertasDisponibles, setOfertasDisponibles] = useState([])
  const [misMatches, setMisMatches] = useState([])
  const [scoresMap, setScoresMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [likeError, setLikeError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ofertasData, matchesData, postulaciones] = await Promise.all([
          ofertaService.getAll({ estado: 'activa' }),
          matchService.misMatches(),
          matchService.feedCandidato(),
        ])
        const likedOfferIds = new Set((postulaciones || []).map(p => p.oferta?.id_ofertas))
        setOfertasDisponibles((ofertasData || []).filter(o => !likedOfferIds.has(o.id_ofertas)))
        setMisMatches(matchesData || [])

        if (usuario?.id) {
          recommendationService.getRecomendaciones(usuario.id)
            .then(recomendaciones => {
              const map = {}
              ;(recomendaciones || []).forEach(r => {
                map[r.id_oferta] = r.score_match
              })
              setScoresMap(map)
            })
            .catch(err => console.error('Error al cargar recomendaciones:', err))
        }
      } catch (err) {
        setError('Error al cargar ofertas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (usuario) fetchData()
  }, [usuario])

  const advanceCard = useCallback(() => {
    setSwipeDirection(null)
    setDragOffset(0)
    setCurrentIndex(prev => prev + 1)
  }, [])

  const handlePass = useCallback(() => {
    setSwipeDirection('left')
    setTimeout(advanceCard, 300)
  }, [advanceCard])

  const handleInterested = useCallback(async () => {
    const current = ofertasDisponibles[currentIndex]
    if (!current) return

    setSwipeDirection('right')
    try {
      await matchService.darLike(current.id_ofertas, scoresMap[current.id_ofertas])
    } catch (err) {
      const message = err.response?.data?.message || 'Error al aplicar a la oferta'
      setLikeError(message)
      setSwipeDirection(null)
      return
    }
    setLikeError(null)
    setTimeout(advanceCard, 300)
  }, [currentIndex, ofertasDisponibles, scoresMap, advanceCard])

  const handleDragStart = useCallback((clientX) => {
    if (swipeDirection) return
    setDragging(true)
    dragStart.current = clientX
  }, [swipeDirection])

  const handleDragMove = useCallback((clientX) => {
    if (!dragging || dragStart.current === null) return
    const offset = clientX - dragStart.current
    setDragOffset(offset)
    if (offset < -SWIPE_THRESHOLD) setSwipeDirection('left')
    else if (offset > SWIPE_THRESHOLD) setSwipeDirection('right')
    else setSwipeDirection(null)
  }, [dragging])

  const handleDragEnd = useCallback(() => {
    if (!dragging || dragStart.current === null) return
    setDragging(false)
    dragStart.current = null

    if (swipeDirection === 'left') {
      setSwipeDirection('left')
      setTimeout(advanceCard, 300)
    } else if (swipeDirection === 'right') {
      handleInterested()
    } else {
      setDragOffset(0)
      setSwipeDirection(null)
    }
  }, [dragging, swipeDirection, advanceCard, handleInterested])

  const onMouseDown = (e) => handleDragStart(e.clientX)
  const onMouseMove = (e) => { if (dragging) handleDragMove(e.clientX) }
  const onMouseUp = handleDragEnd
  const onMouseLeave = () => { if (dragging) handleDragEnd() }
  const onTouchStart = (e) => handleDragStart(e.touches[0].clientX)
  const onTouchMove = (e) => { if (dragging) handleDragMove(e.touches[0].clientX) }
  const onTouchEnd = handleDragEnd

  const remainingMatches = ofertasDisponibles.length - currentIndex
  const currentOferta = ofertasDisponibles[currentIndex]
  const nextOferta = ofertasDisponibles[currentIndex + 1]

  const cardTransform = dragging
    ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`
    : swipeDirection === 'left'
      ? 'translateX(-150%) rotate(-15deg)'
      : swipeDirection === 'right'
        ? 'translateX(150%) rotate(15deg)'
        : 'translateX(0) rotate(0)'

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <GlobalNavigation activeTab="match" notificationCount={misMatches.length} type="candidato" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Descubre oportunidades</h1>
            <p className="text-slate-500 text-sm">Encuentra el trabajo perfecto para ti</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Buscar</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-white border border-slate-200/50">
          <Badge className="bg-blue-500/10 text-blue-600 border-0 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            {remainingMatches} ofertas disponibles
          </Badge>
          <div className="h-4 w-px bg-slate-200" />
          <Badge variant="secondary" className="px-3 py-1.5">
            <Briefcase className="h-3.5 w-3.5 mr-1.5" />
            {misMatches.length} matches activos
          </Badge>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center">
            {likeError && (
              <div className="w-full max-w-[400px] mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                {likeError}
              </div>
            )}
            <div className="relative w-full max-w-[400px] h-[560px] select-none">
              {nextOferta && (
                <div className="absolute inset-x-3 top-3 h-full">
                  <MatchCard
                    id={nextOferta.id_ofertas}
                    companyName={nextOferta.perfil_empresa?.nombre || 'Empresa'}
                    isVerified={true}
                    jobTitle={nextOferta.titulo || 'Oferta'}
                    location={nextOferta.direccion || 'No especificada'}
                    locationType={nextOferta.modalidad || 'No especificada'}
                    salaryRange={nextOferta.pago ? `$${nextOferta.pago}` : 'A convenir'}
                    matchPercentage={scoresMap[nextOferta.id_ofertas] ?? 85}
                    description={nextOferta.descripcion || ''}
                    requiredSkills={nextOferta.habilidades_ofertas?.map(h => h.habilidad?.nombre) || []}
                    matchingSkills={[]}
                    isTopCard={false}
                  />
                </div>
              )}

              {currentOferta ? (
                <div
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  style={{
                    transform: cardTransform,
                    transition: dragging ? 'none' : 'transform 0.3s ease-out',
                  }}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseLeave}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <MatchCard
                    id={currentOferta.id_ofertas}
                    companyName={currentOferta.perfil_empresa?.nombre || 'Empresa'}
                    isVerified={true}
                    jobTitle={currentOferta.titulo || 'Oferta'}
                    location={currentOferta.direccion || 'No especificada'}
                    locationType={currentOferta.modalidad || 'No especificada'}
                    salaryRange={currentOferta.pago ? `$${currentOferta.pago}` : 'A convenir'}
                    matchPercentage={scoresMap[currentOferta.id_ofertas] ?? 85}
                    description={currentOferta.descripcion || ''}
                    requiredSkills={currentOferta.habilidades_ofertas?.map(h => h.habilidad?.nombre) || []}
                    matchingSkills={[]}
                    swipeDirection={swipeDirection}
                    isTopCard={true}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/50 shadow-lg">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                    <Building2 className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No hay más ofertas</h3>
                  <p className="text-sm text-slate-500 text-center px-8 mb-6 max-w-[280px]">
                    Has visto todas las ofertas disponibles. ¡Vuelve pronto para más!
                  </p>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Ajustar filtros
                  </Button>
                </div>
              )}
            </div>

            {currentOferta && (
              <>
                <MatchActions
                  onPass={handlePass}
                  onInterested={handleInterested}
                  onHoverPass={(hovering) => !swipeDirection && setSwipeDirection(hovering ? 'left' : null)}
                  onHoverInterested={(hovering) => !swipeDirection && setSwipeDirection(hovering ? 'right' : null)}
                />
                <div className="flex items-center justify-center gap-8 mt-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono">←</kbd>
                    Pasar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono">→</kbd>
                    Aplicar
                  </span>
                </div>
              </>
            )}
          </div>

          <aside className="lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-24">
              {misMatches.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200/50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Tus matches</h3>
                    <Button variant="ghost" size="sm" className="text-blue-600 gap-1 h-auto py-1 px-2">
                      Ver todos
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {misMatches.map((match) => (
                      <Link
                        key={match.id_match}
                        href="/dashboardcandidato/mensajes"
                        className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 transition-colors group no-underline"
                      >
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center ring-2 ring-emerald-500 ring-offset-2 ring-offset-white transition-all group-hover:ring-offset-slate-50">
                            <Building2 className="h-6 w-6 text-slate-400" />
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-slate-900 text-sm">
                            {match.oferta?.perfil_empresa?.nombre || 'Empresa'}
                          </p>
                          <p className="text-xs text-slate-500">
                            Match · Ir al chat
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm mb-1">Mejora tu perfil</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Los perfiles completos tienen 3x más probabilidades de hacer match con ofertas relevantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

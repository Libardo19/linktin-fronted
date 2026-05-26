'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { CandidateCard } from '@/components/linktin/CandidateCard'
import { MatchActions } from '@/components/linktin/MatchActions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Plus, Eye, Users, TrendingUp, Building2, Briefcase, Heart, MessageCircle, Target, ChevronRight } from 'lucide-react'
import { empresaService } from '@/services/empresa.service'
import { ofertaService } from '@/services/oferta.service'
import { matchService } from '@/services/match.service'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function EmpresaDashboardPage() {
  const { usuario } = useAuth()
  const [perfil, setPerfil] = useState(null)
  const [ofertas, setOfertas] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [perfilData, ofertasData, matchesData] = await Promise.all([
          empresaService.getMiPerfil(),
          ofertaService.getMisOfertas(),
          matchService.misMatches(),
        ])
        setPerfil(perfilData)
        setOfertas(ofertasData || [])
        setMatches(matchesData || [])
      } catch (err) {
        setError('Error al cargar datos de la empresa')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const candidatos = matches
    .filter(m => m.estadoUsuario === 'pendiente' || m.estadoEmpresa === 'pendiente')
    .map(m => ({
      id: m.id_match,
      name: m.usuario?.perfil_candidato
        ? `${m.usuario.perfil_candidato.nombres} ${m.usuario.perfil_candidato.apellidos}`
        : 'Candidato',
      title: m.usuario?.perfil_candidato?.biografia?.substring(0, 30) || 'Candidato',
      university: m.usuario?.perfil_candidato?.educacion_candidatos?.[0]?.institucion || 'Universidad',
      location: m.usuario?.perfil_candidato?.ubicacion || 'Ubicación',
      matchPercentage: Math.round(m.compatibilidad || 85),
      skills: m.oferta?.habilidades_ofertas?.map(h => h.habilidad?.nombre).filter(Boolean) || [],
    }))

  const pipeline = {
    newMatches: matches
      .filter(m => m.estadoUsuario === 'pendiente' || m.estadoEmpresa === 'pendiente')
      .slice(0, 3)
      .map(m => ({
        id: m.id_match,
        name: m.usuario?.perfil_candidato?.nombres
          ? `${m.usuario.perfil_candidato.nombres.split(' ')[0]} ${(m.usuario.perfil_candidato.apellidos || '').split(' ')[0]}`
          : 'Candidato',
        matchPercentage: Math.round(m.compatibilidad || 85),
      })),
    inReview: matches
      .filter(m => m.estadoUsuario === 'aceptado' && m.estadoEmpresa !== 'aceptado')
      .slice(0, 2)
      .map(m => ({
        id: m.id_match,
        name: m.usuario?.perfil_candidato?.nombres
          ? `${m.usuario.perfil_candidato.nombres.split(' ')[0]} ${(m.usuario.perfil_candidato.apellidos || '').split(' ')[0]}`
          : 'Candidato',
        matchPercentage: Math.round(m.compatibilidad || 85),
      })),
    interview: matches
      .filter(m => m.estadoUsuario === 'aceptado' && m.estadoEmpresa === 'aceptado')
      .slice(0, 1)
      .map(m => ({
        id: m.id_match,
        name: m.usuario?.perfil_candidato?.nombres
          ? `${m.usuario.perfil_candidato.nombres.split(' ')[0]} ${(m.usuario.perfil_candidato.apellidos || '').split(' ')[0]}`
          : 'Candidato',
        matchPercentage: Math.round(m.compatibilidad || 85),
      })),
  }

  const currentCandidate = candidatos[currentCandidateIndex]
  const nextCandidate = candidatos[currentCandidateIndex + 1]

  const handlePass = async () => {
    const current = candidatos[currentCandidateIndex]
    if (!current) return
    setSwipeDirection('left')
    try {
      await matchService.rechazar(current.id)
    } catch (err) {
      console.error('Error al rechazar:', err)
    }
    setTimeout(() => {
      setSwipeDirection(null)
      if (currentCandidateIndex < candidatos.length - 1) {
        setCurrentCandidateIndex(currentCandidateIndex + 1)
      }
    }, 300)
  }

  const handleInterested = async () => {
    const current = candidatos[currentCandidateIndex]
    if (!current) return
    setSwipeDirection('right')
    try {
      await matchService.aceptar(current.id)
    } catch (err) {
      console.error('Error al aceptar:', err)
    }
    setTimeout(() => {
      setSwipeDirection(null)
      if (currentCandidateIndex < candidatos.length - 1) {
        setCurrentCandidateIndex(currentCandidateIndex + 1)
      }
    }, 300)
  }

  const activeOfertas = ofertas.filter(o => o.estado === 'activa')
  const totalViews = ofertas.reduce((sum, o) => sum + (o.vistas || 0), 0)
  const totalApplications = ofertas.reduce((sum, o) => sum + (o.postulaciones?.length || 0), 0)
  const matchRate = matches.length > 0
    ? Math.round((matches.filter(m => m.estadoUsuario === 'aceptado' || m.estadoEmpresa === 'aceptado').length / matches.length) * 100)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
      <GlobalNavigation activeTab="home" notificationCount={matches.filter(m => m.estadoUsuario === 'pendiente').length} type="empresa" />
      
      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Company Info */}
          <aside className="col-span-3">
            <CompanySidebar
              companyName={perfil?.nombre || 'Mi Empresa'}
              sector={perfil?.sector?.nombre || perfil?.industria || 'Tecnología'}
              location={perfil?.ubicacion || 'Colombia'}
              activeJobPosts={activeOfertas.length}
              totalCandidates={matches.length}
              newMatches={candidatos.length}
              profileCompletion={perfil?.biografia ? 85 : 45}
              rating={4.5}
            />
          </aside>

          {/* Center Content */}
          <div className="col-span-6 space-y-6">
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
              <CardContent className="p-6">
                <h1 className="text-xl font-bold">Welcome back, {perfil?.nombre || 'Empresa'}</h1>
                <p className="mt-1 text-blue-100 text-sm">
                  You have {candidatos.length} new candidate matches to review
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/dashboardempresa/ofertas/nueva">
                    <Button className="bg-white text-blue-600 hover:bg-blue-50">
                      <Plus className="h-4 w-4 mr-2" />
                      Post New Job
                    </Button>
                  </Link>
                  <Link href="/dashboardempresa/matches">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                      <Target className="h-4 w-4 mr-2" />
                      View Matches
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-xs text-blue-600 font-medium">+{Math.round(totalViews * 0.12)}%</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{totalViews}</p>
                  <p className="text-sm text-slate-500">Profile Views</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-green-50">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-xs text-green-600 font-medium">{candidatos.length} new</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{totalApplications}</p>
                  <p className="text-sm text-slate-500">Applications</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-50">
                      <Briefcase className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{activeOfertas.length}</p>
                  <p className="text-sm text-slate-500">Active Jobs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-red-50">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{matches.length}</p>
                  <p className="text-sm text-slate-500">Total Matches</p>
                </CardContent>
              </Card>
            </div>

            {/* Candidate Matching */}
            {candidatos.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Candidate Matching
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {candidatos.length - currentCandidateIndex} remaining
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-[360px] h-[440px]">
                      {nextCandidate && (
                        <div className="absolute inset-x-4 top-4 h-full">
                          <CandidateCard {...nextCandidate} isTopCard={false} />
                        </div>
                      )}
                      {currentCandidate ? (
                        <div className="absolute inset-0">
                          <CandidateCard
                            {...currentCandidate}
                            swipeDirection={swipeDirection}
                            isTopCard={true}
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                          <Users className="h-12 w-12 text-slate-400 mb-3" />
                          <h3 className="text-base font-semibold text-slate-900">All caught up!</h3>
                          <p className="text-sm text-slate-500 text-center mt-2 px-6">
                            You&apos;ve reviewed all matching candidates
                          </p>
                        </div>
                      )}
                    </div>
                    {currentCandidate && (
                      <MatchActions
                        onPass={handlePass}
                        onInterested={handleInterested}
                        onHoverPass={(h) => !swipeDirection && setSwipeDirection(h ? 'left' : null)}
                        onHoverInterested={(h) => !swipeDirection && setSwipeDirection(h ? 'right' : null)}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hiring Pipeline */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Hiring Pipeline</CardTitle>
                <Link href="/dashboardempresa/matches">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-slate-700">New Matches</h4>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {pipeline.newMatches.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {pipeline.newMatches.map((c) => (
                        <div key={c.id} className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">
                            {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-sm flex-1 truncate text-slate-800">{c.name}</span>
                          <span className="text-xs text-blue-600 font-medium">{c.matchPercentage}%</span>
                        </div>
                      ))}
                      {pipeline.newMatches.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-2">No new matches</p>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-slate-700">In Review</h4>
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        {pipeline.inReview.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {pipeline.inReview.map((c) => (
                        <div key={c.id} className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-xs font-bold text-amber-600">
                            {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-sm flex-1 truncate text-slate-800">{c.name}</span>
                          <span className="text-xs text-amber-600 font-medium">{c.matchPercentage}%</span>
                        </div>
                      ))}
                      {pipeline.inReview.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-2">None in review</p>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-slate-700">Interview</h4>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {pipeline.interview.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {pipeline.interview.map((c) => (
                        <div key={c.id} className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-xs font-bold text-emerald-600">
                            {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-sm flex-1 truncate text-slate-800">{c.name}</span>
                          <span className="text-xs text-emerald-600 font-medium">{c.matchPercentage}%</span>
                        </div>
                      ))}
                      {pipeline.interview.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-2">No interviews</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Posts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Job Posts
                </CardTitle>
                <Link href="/dashboardempresa/ofertas">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-slate-100">
                  {ofertas.slice(0, 3).map((oferta) => (
                    <div key={oferta.id_ofertas} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{oferta.titulo}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {oferta.modalidad || 'No especificada'} · {oferta.ubicacion || 'Sin ubicación'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">{oferta.postulaciones?.length || 0} apps</span>
                        <Badge variant={oferta.estado === 'activa' ? 'success' : 'secondary'} className="text-[10px] px-2">
                          {oferta.estado === 'activa' ? 'Active' : oferta.estado}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {ofertas.length === 0 && (
                    <div className="text-center py-4">
                      <Building2 className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">No job posts yet</p>
                      <Link href="/dashboardempresa/ofertas/nueva">
                        <Button size="sm" className="mt-2">
                          <Plus className="h-4 w-4 mr-1" />
                          Create First Job
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Analytics */}
          <aside className="col-span-3 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  Profile Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-slate-900">{totalViews}</p>
                <p className="text-xs text-slate-500 mt-1">views this week</p>
                <div className="mt-3 flex items-end justify-between h-16 gap-1">
                  {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-200 rounded-t transition-all hover:bg-blue-300"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  Skills Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['React', 'TypeScript', 'Node.js', 'Python'].map((skill, i) => (
                  <div key={skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{skill}</span>
                      <span className="text-slate-500">{80 - i * 15}%</span>
                    </div>
                    <Progress value={80 - i * 15} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Heart className="h-4 w-4 text-blue-600" />
                  Match Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                      <circle
                        cx="60" cy="60" r="50"
                        fill="none" stroke="#3B82F6" strokeWidth="10"
                        strokeDasharray={`${matchRate * 3.14} ${314 - matchRate * 3.14}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-slate-900">{matchRate}%</span>
                      <span className="text-[10px] text-slate-500">match rate</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Link href="/dashboardempresa/ofertas/nueva">
              <Button className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Post New Job
              </Button>
            </Link>
          </aside>
        </div>
      </main>
    </div>
  )
}

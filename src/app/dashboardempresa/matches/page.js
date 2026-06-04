'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Search, MapPin, GraduationCap, Mail, Eye, CheckCircle, XCircle, Building2, Zap, Briefcase, Star, MessageCircle } from 'lucide-react'
import { matchService } from '@/services/match.service'
import { empresaService } from '@/services/empresa.service'
import Link from 'next/link'

const statusColors = {
  pendiente: 'bg-blue-100 text-blue-700',
  aceptado: 'bg-emerald-100 text-emerald-700',
  rechazado: 'bg-red-100 text-red-700',
}

const statusLabels = {
  pendiente: 'Pending',
  aceptado: 'Accepted',
  rechazado: 'Rejected',
}

export default function EmpresaMatchesPage() {
  const [perfil, setPerfil] = useState(null)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfilData = await empresaService.getMiPerfil()
        setPerfil(perfilData)
        setLoading(false)

        matchService.getCandidatosEmpresa()
          .then(data => setMatches(data || []))
          .catch(err => console.error('Error al cargar matches:', err))
      } catch (err) {
        setError('Error al cargar perfil de empresa')
        console.error(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAccept = async (matchId) => {
    try {
      await matchService.aceptar(matchId)
      setMatches(prev => prev.map(m =>
        m.id_match === matchId ? { ...m, estadoEmpresa: 'aceptado' } : m
      ))
    } catch (err) {
      console.error('Error al aceptar:', err)
    }
  }

  const handleReject = async (matchId) => {
    try {
      await matchService.rechazar(matchId)
      setMatches(prev => prev.map(m =>
        m.id_match === matchId ? { ...m, estadoEmpresa: 'rechazado' } : m
      ))
    } catch (err) {
      console.error('Error al rechazar:', err)
    }
  }

  const filteredMatches = matches.filter((m) => {
    if (statusFilter !== 'all') {
      const status = m.estadoEmpresa || m.estadoUsuario
      if (status !== statusFilter) return false
    }
    if (searchQuery) {
      const name = m.usuario?.perfil_candidato
        ? `${m.usuario.perfil_candidato.nombres} ${m.usuario.perfil_candidato.apellidos}`
        : ''
      if (!name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    }
    return true
  })

  const counts = {
    all: matches.length,
    pendiente: matches.filter(m => m.estadoEmpresa === 'pendiente' || !m.estadoEmpresa).length,
    aceptado: matches.filter(m => m.estadoEmpresa === 'aceptado').length,
    rechazado: matches.filter(m => m.estadoEmpresa === 'rechazado').length,
  }

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
      <GlobalNavigation activeTab="match" notificationCount={counts.pendiente} type="empresa" />
      
      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="col-span-3">
            <CompanySidebar
              companyName={perfil?.nombre || 'Mi Empresa'}
              sector={perfil?.sector?.nombre || perfil?.industria || 'Tecnología'}
              location={perfil?.ubicacion || 'Colombia'}
              activeJobPosts={perfil?.ofertas?.length || 0}
              totalCandidates={matches.length}
              newMatches={counts.pendiente}
              profileCompletion={perfil?.biografia ? 85 : 45}
            />
          </aside>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Candidate Matches</h1>
              <p className="text-sm text-slate-500 mt-1">
                {counts.pendiente} pending · {counts.aceptado} accepted · {counts.rechazado} rejected
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total', value: counts.all, color: 'text-slate-900' },
                { label: 'Pending', value: counts.pendiente, color: 'text-blue-600' },
                { label: 'Accepted', value: counts.aceptado, color: 'text-emerald-600' },
                { label: 'Rejected', value: counts.rechazado, color: 'text-red-500' },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search candidates..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                {(['all', 'pendiente', 'aceptado', 'rechazado']).map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className="capitalize"
                  >
                    {status === 'all' ? 'All' : statusLabels[status]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Matches List */}
            <div className="space-y-4">
              {filteredMatches.length > 0 ? filteredMatches.map((match) => {
                const candidato = match.usuario?.perfil_candidato
                const estadoActual = match.estadoEmpresa || match.estadoUsuario
                return (
                  <Card key={match.id_match} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-blue-600">
                            {candidato
                              ? `${candidato.nombres?.[0] || ''}${candidato.apellidos?.[0] || ''}`
                              : '??'
                            }
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-slate-900">
                              {candidato ? `${candidato.nombres} ${candidato.apellidos}` : 'Candidato'}
                            </h3>
                            <Badge className={statusColors[estadoActual] || 'bg-slate-100 text-slate-700'}>
                              {statusLabels[estadoActual] || estadoActual}
                            </Badge>
                            {match.compatibilidad && (
                              <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                {Math.round(match.compatibilidad)}% match
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">{candidato?.biografia?.substring(0, 50) || 'Sin biografía'}</p>

                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            {candidato?.ubicacion && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {candidato.ubicacion}
                              </span>
                            )}
                            {match.oferta && (
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {match.oferta.titulo}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {match.oferta?.habilidades_ofertas?.slice(0, 4).map((h, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                              >
                                {h.habilidad?.nombre || 'Skill'}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Profile
                          </Button>
                          {match.estadoEmpresa === 'aceptado' ? (
                            match.estadoUsuario === 'aceptado' ? (
                              <Link href={`/dashboardempresa/mensajes?userId=${match.usuario?.id_usuarios}`}>
                                <Button size="sm" className="w-full gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  Chat
                                </Button>
                              </Link>
                            ) : (
                              <span className="text-xs text-emerald-600 font-medium">Accepted</span>
                            )
                          ) : match.estadoEmpresa === 'rechazado' ? (
                            <span className="text-xs text-red-500 font-medium">Rejected</span>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-emerald-600 hover:text-emerald-700"
                                onClick={() => handleAccept(match.id_match)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleReject(match.id_match)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              }) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-slate-900">No matches found</h3>
                    <p className="text-sm text-slate-500 mt-1">Try adjusting your filters</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

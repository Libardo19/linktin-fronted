'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Plus, Search, Eye, MapPin, DollarSign, Clock, Building2, Target, Pause, Play, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { ofertaService } from '@/services/oferta.service'
import { empresaService } from '@/services/empresa.service'

export default function OfertasPage() {
  const [perfil, setPerfil] = useState(null)
  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [perfilData, ofertasData] = await Promise.all([
          empresaService.getMiPerfil(),
          ofertaService.getMisOfertas(),
        ])
        setPerfil(perfilData)
        setOfertas(ofertasData || [])
      } catch (err) {
        setError('Error al cargar ofertas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleStatusToggle = async (oferta) => {
    try {
      const nuevoEstado = oferta.estado === 'activa' ? 'pausada' : 'activa'
      await ofertaService.cambiarEstado(oferta.id_ofertas, nuevoEstado)
      setOfertas(prev => prev.map(o =>
        o.id_ofertas === oferta.id_ofertas ? { ...o, estado: nuevoEstado } : o
      ))
    } catch (err) {
      console.error('Error al cambiar estado:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta oferta?')) return
    try {
      await ofertaService.remove(id)
      setOfertas(prev => prev.filter(o => o.id_ofertas !== id))
    } catch (err) {
      console.error('Error al eliminar:', err)
    }
  }

  const filteredOfertas = ofertas.filter((o) => {
    if (filter !== 'all' && o.estado !== filter) return false
    if (searchQuery && !o.titulo?.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const counts = {
    all: ofertas.length,
    activa: ofertas.filter(o => o.estado === 'activa').length,
    pausada: ofertas.filter(o => o.estado === 'pausada').length,
    cerrada: ofertas.filter(o => o.estado === 'cerrada').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="jobs" notificationCount={0} type="empresa" />
      
      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="col-span-3">
            <CompanySidebar
              companyName={perfil?.nombre || 'Mi Empresa'}
              sector={perfil?.sector?.nombre || perfil?.industria || 'Tecnología'}
              location={perfil?.ubicacion || 'Colombia'}
              activeJobPosts={counts.activa}
              totalCandidates={0}
              newMatches={0}
              profileCompletion={perfil?.biografia ? 85 : 45}
            />
          </aside>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Job Posts</h1>
                <p className="text-sm text-slate-500 mt-1">
                  {counts.activa} active · {counts.pausada} paused · {counts.cerrada} closed
                </p>
              </div>
              <Link href="/dashboardempresa/ofertas/nueva">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Post New Job
                </Button>
              </Link>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search job posts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                {(['all', 'activa', 'pausada', 'cerrada']).map((status) => (
                  <Button
                    key={status}
                    variant={filter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(status)}
                    className="capitalize"
                  >
                    {status === 'all' ? 'All' : status} ({counts[status]})
                  </Button>
                ))}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-red-500 mb-3">{error}</p>
                  <Button onClick={() => window.location.reload()}>Reintentar</Button>
                </CardContent>
              </Card>
            )}

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredOfertas.length > 0 ? filteredOfertas.map((oferta) => (
                <Card key={oferta.id_ofertas} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-900">{oferta.titulo}</h3>
                          <Badge
                            variant={oferta.estado === 'activa' ? 'success' : oferta.estado === 'pausada' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {oferta.estado || 'Unknown'}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                          {oferta.ubicacion && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {oferta.ubicacion}
                            </span>
                          )}
                          {oferta.modalidad && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {oferta.modalidad}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {oferta.habilidades_ofertas?.slice(0, 4).map((h, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                              {h.habilidad?.nombre || 'Skill'}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-slate-900">{oferta.vistas || 0}</p>
                          <p className="text-xs text-slate-500">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-slate-900">{oferta.postulaciones?.length || 0}</p>
                          <p className="text-xs text-slate-500">Applications</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-blue-600">0</p>
                          <p className="text-xs text-slate-500">Matches</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusToggle(oferta)}
                          >
                            {oferta.estado === 'activa' ? (
                              <Pause className="h-4 w-4 text-amber-500" />
                            ) : (
                              <Play className="h-4 w-4 text-emerald-500" />
                            )}
                          </Button>
                          <Link href={`/dashboardempresa/ofertas/${oferta.id_ofertas}/editar`}>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4 text-slate-500" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(oferta.id_ofertas)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-slate-900">No job posts yet</h3>
                    <p className="text-sm text-slate-500 mt-1">Create your first job posting</p>
                    <Link href="/dashboardempresa/ofertas/nueva">
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                      </Button>
                    </Link>
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

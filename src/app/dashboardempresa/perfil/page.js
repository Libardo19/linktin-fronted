'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { SkillTag } from '@/components/linktin/SkillTag'
import { Pencil, Settings, Share2, Building2, Globe, MapPin, Briefcase, Mail, Phone, Users } from 'lucide-react'
import { empresaService } from '@/services/empresa.service'
import { useAuth } from '@/context/AuthContext'
import PerfilEmpresaForm from '@/components/empresa/PerfilEmpresaForm'
import ResenasPerfil from '@/components/resenas/ResenasPerfil'

export default function PerfilEmpresaPage() {
  const { usuario } = useAuth()
  const [perfil, setPerfil] = useState(null)
  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(false)

  const fetchPerfil = async () => {
    try {
      const data = await empresaService.getMiPerfil()
      setPerfil(data)
    } catch (err) {
      if (err.response?.status === 404) {
        setPerfil(null)
      } else {
        setError('Error al cargar el perfil')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPerfil()
  }, [])

  const handlePerfilActualizado = (perfilActualizado) => {
    setPerfil(perfilActualizado)
    setEditando(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="min-h-screen bg-slate-50">
        <GlobalNavigation activeTab="profile" notificationCount={0} type="empresa" />
        <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
          <div className="max-w-2xl mx-auto">
            <PerfilEmpresaForm onPerfilActualizado={handlePerfilActualizado} />
          </div>
        </main>
      </div>
    )
  }

  const ofertasActivas = perfil.ofertas?.filter((o) => o.estado === 'activa') || []
  const habilidadesDemandadas = []
  const skillsSet = new Set()
  if (perfil.ofertas) {
    for (const oferta of perfil.ofertas) {
      if (oferta.habilidades_ofertas) {
        for (const ho of oferta.habilidades_ofertas) {
          if (ho.habilidad?.nombre && !skillsSet.has(ho.habilidad.nombre)) {
            skillsSet.add(ho.habilidad.nombre)
            habilidadesDemandadas.push(ho.habilidad.nombre)
          }
        }
      }
    }
  }

  const profileData = {
    name: perfil.nombre || 'Mi Empresa',
    sector: perfil.sector?.nombre || perfil.industria || 'Tecnología',
    location: perfil.ubicacion || 'Sin ubicación',
    profileCompletion: perfil.descripcion ? 85 : 45,
  }

  if (editando) {
    return (
      <div className="min-h-screen bg-slate-50">
        <GlobalNavigation activeTab="profile" notificationCount={0} type="empresa" />
        <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
          <div className="max-w-2xl mx-auto">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Editar perfil de empresa
                  <Button variant="ghost" size="sm" onClick={() => setEditando(false)}>
                    Cancelar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PerfilEmpresaForm perfil={perfil} onPerfilActualizado={handlePerfilActualizado} modo="editar" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="profile" notificationCount={0} type="empresa" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Company Card */}
          <aside className="col-span-3 space-y-4">
            <CompanySidebar
              companyName={profileData.name}
              sector={profileData.sector}
              location={profileData.location}
              activeJobPosts={ofertasActivas.length}
              totalCandidates={0}
              newMatches={0}
              profileCompletion={profileData.profileCompletion}
              logo={perfil?.logo_url || null}
            />

            {/* Reseñas recibidas - vista compacta */}
            <ResenasPerfil idUsuario={usuario?.id} compact={true} />

            {/* Contact Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {usuario?.email && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {usuario.email}
                  </div>
                )}
                {perfil.website && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Globe className="h-4 w-4 text-slate-400" />
                    <a href={perfil.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                      {perfil.website.replace('https://', '').replace('http://', '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="h-4 w-4 text-slate-400" />
                  {perfil.ofertas?.length || 0} ofertas publicadas
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="col-span-9">
            {/* Profile Header Card */}
            <Card className="mb-4 overflow-hidden">
              {/* Banner */}
              <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" />

              <CardContent className="pt-0 -mt-16 pb-4">
                <div className="flex items-end justify-between mb-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-100 overflow-hidden">
                      {perfil?.logo_url ? (
                        <img src={perfil.logo_url} alt={profileData.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                          <span className="text-4xl font-bold text-blue-600">
                            {(profileData.name || 'E').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Compartir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Configuración
                    </Button>
                    <Button size="sm" onClick={() => setEditando(true)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Editar Perfil
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{profileData.name}</h1>
                  <p className="text-base text-slate-600 mt-1">{profileData.sector}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    {profileData.location} · <Building2 className="h-3 w-3 inline mr-1" />{ofertasActivas.length} ofertas activas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-4">
              <TabsList className="bg-white border border-slate-200">
                <TabsTrigger value="about">Acerca de</TabsTrigger>
                <TabsTrigger value="experience">Ofertas Activas</TabsTrigger>
                <TabsTrigger value="skills">Habilidades Demandadas</TabsTrigger>
                <TabsTrigger value="education">Contacto</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">Acerca de</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setEditando(true)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {perfil.descripcion || perfil.biografia || 'Sin descripción'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">Ofertas Activas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ofertasActivas.length > 0 ? ofertasActivas.map((oferta) => (
                      <div key={oferta.id_ofertas} className="flex gap-4 p-3 rounded-lg border border-slate-200">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{oferta.titulo}</h4>
                          <p className="text-sm text-slate-500">
                            {oferta.modalidad || 'No especificada'} · {oferta.ubicacion || 'Sin ubicación'}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {oferta.postulaciones?.length || 0} postulaciones · {oferta.vistas || 0} vistas
                          </p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-slate-400 italic">No hay ofertas activas</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">Habilidades Demandadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 mb-3">
                      Habilidades más solicitadas en las ofertas de esta empresa
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {habilidadesDemandadas.length > 0 ? (
                        habilidadesDemandadas.map((skill) => (
                          <SkillTag key={skill} skill={skill} />
                        ))
                      ) : (
                        <p className="text-sm text-slate-400 italic">No hay habilidades registradas</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <ResenasPerfil idUsuario={usuario?.id} />
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">Información de Contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {usuario?.email && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Correo Electrónico</p>
                          <p className="text-xs text-slate-500">{usuario.email}</p>
                        </div>
                      </div>
                    )}
                    {perfil.website && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Sitio Web</p>
                          <a href={perfil.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                            {perfil.website}
                          </a>
                        </div>
                      </div>
                    )}
                    {perfil.ubicacion && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Ubicación</p>
                          <p className="text-xs text-slate-500">{perfil.ubicacion}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

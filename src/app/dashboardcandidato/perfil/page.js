'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { ProfileSidebar } from '@/components/linktin/ProfileSidebar'
import { SkillTag } from '@/components/linktin/SkillTag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Pencil, Settings, Share2, Building2, GraduationCap, Award, ExternalLink } from 'lucide-react'
import { candidatoService } from '@/services/candidato.service'
import { useAuth } from '@/context/AuthContext'
import PerfilForm from '@/components/candidato/PerfilForm'

export default function PerfilPage() {
  const { usuario } = useAuth()
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(false)

  const fetchPerfil = async () => {
    try {
      const data = await candidatoService.getMiPerfil()
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
        <GlobalNavigation activeTab="profile" notificationCount={0} type="candidato" />
        <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
          <div className="max-w-2xl mx-auto">
            <PerfilForm onPerfilCreado={handlePerfilActualizado} />
          </div>
        </main>
      </div>
    )
  }

  const profileData = {
    name: `${perfil.nombres} ${perfil.apellidos}`,
    title: perfil.biografia?.substring(0, 50) || 'Sin título',
    location: perfil.ubicacion || 'Sin ubicación',
    profileCompletion: perfil.biografia ? 65 : 30,
    isOpenToWork: true,
    avatar: perfil.foto_url || null,
    about: perfil.biografia || 'Sin descripción',
    skills: perfil.habilidadEmpleados?.map(h => ({
      name: h.habilidad?.nombre || 'Sin nombre',
      endorsements: h.nivel || 1
    })) || [],
    experience: perfil.experiencia_candidatos?.map(exp => ({
      id: exp.id_experiencia,
      title: exp.cargo,
      company: exp.empresa,
      location: '',
      dateRange: `${exp.anio_inicio} - ${exp.anio_fin || 'Presente'}`,
      description: ''
    })) || [],
    education: perfil.educacion_candidatos?.map(edu => ({
      id: edu.id_educacion,
      degree: edu.titulo,
      institution: edu.institucion,
      years: `${edu.anio_inicio} - ${edu.anio_fin || 'Presente'}`,
      description: ''
    })) || [],
    connections: 0,
    profileViews: 0,
    searchAppearances: 0,
    languages: [],
    certifications: [],
  }

  if (editando) {
    return (
      <div className="min-h-screen bg-slate-50">
        <GlobalNavigation activeTab="profile" notificationCount={0} type="candidato" />
        <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
          <div className="max-w-2xl mx-auto">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Editar mi perfil
                  <Button variant="ghost" size="sm" onClick={() => setEditando(false)}>
                    Cancelar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PerfilForm perfil={perfil} onPerfilActualizado={handlePerfilActualizado} modo="editar" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="profile" notificationCount={0} type="candidato" />
      
      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile Card */}
          <aside className="col-span-3 space-y-4">
            <ProfileSidebar {...profileData} avatar={profileData.avatar} />
            
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Profile views</span>
                  <span className="text-sm font-semibold text-blue-600">{profileData.profileViews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Search appearances</span>
                  <span className="text-sm font-semibold text-blue-600">{profileData.searchAppearances}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Connections</span>
                  <span className="text-sm font-semibold text-blue-600">{profileData.connections}</span>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {profileData.languages && profileData.languages.length > 0 ? (
                  profileData.languages.map((lang, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-900">{lang.name}</span>
                      <span className="text-slate-500">{lang.level}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic">No hay idiomas agregados</p>
                )}
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
                      {profileData.avatar ? (
                        <img src={profileData.avatar} alt={profileData.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                          <span className="text-4xl font-bold text-blue-600">
                            {(profileData.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    {profileData.isOpenToWork && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                        Open to Work
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                    <Button size="sm" onClick={() => setEditando(true)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit Profile
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{profileData.name}</h1>
                  <p className="text-base text-slate-600 mt-1">{profileData.title}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {profileData.location} · <span className="text-blue-600">{profileData.connections} connections</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-4">
              <TabsList className="bg-white border border-slate-200">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">About</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {profileData.about}
                    </p>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">Certifications</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {profileData.certifications && profileData.certifications.length > 0 ? (
                      profileData.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <Award className="h-5 w-5 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{cert.name}</p>
                            <p className="text-xs text-slate-500">{cert.issuer} · {cert.year}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4 text-slate-500" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400 italic">No hay certificaciones</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">Experience</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {profileData.experience && profileData.experience.length > 0 ? profileData.experience.map((exp) => (
                      <div key={exp.id} className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-6 w-6 text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{exp.title}</h4>
                          <p className="text-sm text-slate-600">{exp.company} · {exp.location}</p>
                          <p className="text-xs text-slate-400">{exp.dateRange}</p>
                          <p className="text-sm text-slate-600 mt-2">{exp.description}</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-slate-400 italic">No hay experiencia laboral</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">Skills</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills && profileData.skills.length > 0 ? (
                        profileData.skills.map((skill) => (
                          <SkillTag 
                            key={skill.name} 
                            skill={skill.name} 
                            endorsements={skill.endorsements}
                          />
                        ))
                      ) : (
                        <p className="text-sm text-slate-400 italic">No hay habilidades</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">Education</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.education && profileData.education.length > 0 ? (
                      profileData.education.map((edu) => (
                        <div key={edu.id} className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="h-6 w-6 text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{edu.degree}</h4>
                          <p className="text-sm text-slate-600">{edu.institution}</p>
                          <p className="text-xs text-slate-400">{edu.years}</p>
                          <p className="text-sm text-slate-600 mt-1">{edu.description}</p>
                        </div>
                      </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400 italic">No hay educación agregada</p>
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
'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { ProfileSidebar } from '@/components/linktin/ProfileSidebar'
import { SkillTag } from '@/components/linktin/SkillTag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Pencil, Plus, Upload, Building2, GraduationCap, FileText, Users, Briefcase, Save, X } from 'lucide-react'
import { candidatoService } from '@/services/candidato.service'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const suggestedSkills = ['TypeScript', 'Node.js', 'Docker', 'AWS']

const peopleViewed = [
  { name: 'Maria García', title: 'Frontend Developer at Google' },
  { name: 'Carlos Ruiz', title: 'Software Engineer at Microsoft' },
  { name: 'Ana López', title: 'Full Stack Developer' },
]

const suggestedCompanies = [
  { name: 'Rappi', followers: '150K' },
  { name: 'MercadoLibre', followers: '500K' },
  { name: 'Globant', followers: '300K' },
]

export default function CandidatoDashboardPage() {
  const { usuario } = useAuth()
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Estados para edición inline
  const [editandoAbout, setEditandoAbout] = useState(false)
  const [editandoExp, setEditandoExp] = useState(null)
  const [editandoEdu, setEditandoEdu] = useState(null)
  const [editandoHab, setEditandoHab] = useState(false)
  
  // Formularios
  const [formAbout, setFormAbout] = useState('')
  const [formExp, setFormExp] = useState({ empresa: '', cargo: '', anio_inicio: '', anio_fin: '' })
  const [formEdu, setFormEdu] = useState({ institucion: '', titulo: '', anio_inicio: '', anio_fin: '' })
  const [formHab, setFormHab] = useState({ nombre: '', nivel: 'Intermedio' })
  const [guardando, setGuardando] = useState(false)

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

  // Guardar biografía
  const guardarAbout = async () => {
    if (!perfil) return
    setGuardando(true)
    try {
      await candidatoService.updatePerfil(perfil.id_candidato, { biografia: formAbout })
      await fetchPerfil()
      setEditandoAbout(false)
    } catch (err) {
      alert('Error al guardar')
    } finally {
      setGuardando(false)
    }
  }

  // Guardar experiencia
  const guardarExperiencia = async () => {
    if (!perfil) return
    setGuardando(true)
    try {
      if (editandoExp) {
        await candidatoService.updateExperiencia(perfil.id_candidato, editandoExp, formExp)
      } else {
        await candidatoService.addExperiencia(perfil.id_candidato, formExp)
      }
      await fetchPerfil()
      setEditandoExp(null)
      setFormExp({ empresa: '', cargo: '', anio_inicio: '', anio_fin: '' })
    } catch (err) {
      alert('Error al guardar experiencia')
    } finally {
      setGuardando(false)
    }
  }

  // Guardar educación
  const guardarEducacion = async () => {
    if (!perfil) return
    setGuardando(true)
    try {
      if (editandoEdu) {
        await candidatoService.updateEducacion(perfil.id_candidato, editandoEdu, formEdu)
      } else {
        await candidatoService.addEducacion(perfil.id_candidato, formEdu)
      }
      await fetchPerfil()
      setEditandoEdu(null)
      setFormEdu({ institucion: '', titulo: '', anio_inicio: '', anio_fin: '' })
    } catch (err) {
      alert('Error al guardar educación')
    } finally {
      setGuardando(false)
    }
  }

  // Guardar habilidad
  const guardarHabilidad = async () => {
    if (!perfil) return
    setGuardando(true)
    try {
      await candidatoService.addHabilidad(perfil.id_candidato, formHab)
      await fetchPerfil()
      setEditandoHab(false)
      setFormHab({ nombre: '', nivel: 'Intermedio' })
    } catch (err) {
      alert('Error al guardar habilidad')
    } finally {
      setGuardando(false)
    }
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
        <GlobalNavigation activeTab="home" notificationCount={0} type="candidato" />
        <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
          <div className="grid grid-cols-12 gap-6">
            <aside className="col-span-3">
              <ProfileSidebar 
                name="Sin nombre"
                title="Sin título"
                location="Sin ubicación"
                profileCompletion={0}
                isOpenToWork={true}
              />
            </aside>
            <div className="col-span-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 italic mb-3">Completa tu perfil para que las empresas puedan conocerte</p>
                  <Link href="/dashboardcandidato/perfil">
                    <Button>Crear mi perfil</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            <aside className="col-span-3 space-y-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-slate-500 mb-3">¿Te interesan las empresas?</p>
                  <Link href="/dashboardcandidato/matches">
                    <Button variant="outline" size="sm">Ver Matches</Button>
                  </Link>
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    )
  }

  const experienciaData = perfil.experiencia_candidatos || []
  const educacionData = perfil.educacion_candidatos || []
  const habilidadData = perfil.habilidadEmpleados || []

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="home" notificationCount={5} type="candidato" />
      
      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3">
            <ProfileSidebar 
              name={perfil.nombres && perfil.apellidos ? `${perfil.nombres} ${perfil.apellidos}` : 'Sin nombre'}
              title={perfil.biografia ? perfil.biografia.substring(0, 50) : 'Sin título'}
              location={perfil.ubicacion || 'Sin ubicación'}
              profileCompletion={perfil.biografia ? 65 : 30}
              isOpenToWork={true}
            />
          </aside>

          <div className="col-span-6 space-y-4">
            {/* ABOUT */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">About</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => { setFormAbout(perfil.biografia || ''); setEditandoAbout(true) }}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {editandoAbout ? (
                  <div className="space-y-3">
                    <Textarea 
                      value={formAbout}
                      onChange={(e) => setFormAbout(e.target.value)}
                      placeholder="Cuéntanos sobre ti..."
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={guardarAbout} disabled={guardando}>
                        <Save className="h-4 w-4 mr-1" />
                        {guardando ? 'Guardando...' : 'Guardar'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditandoAbout(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className={`text-sm leading-relaxed ${!perfil.biografia ? 'text-slate-400 italic' : 'text-slate-600'}`}>
                    {perfil.biografia || 'Sin descripción'}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* SKILLS */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Skills</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setEditandoHab(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {habilidadData.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {habilidadData.map((h, idx) => (
                      <SkillTag key={idx} skill={h.habilidad?.nombre || 'Sin nombre'} endorsements={h.nivel || 1} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">Sin habilidades agregadas</p>
                )}

                {editandoHab && (
                  <div className="border-t pt-4 space-y-3">
                    <Input 
                      placeholder="Nueva habilidad (ej: JavaScript)"
                      value={formHab.nombre}
                      onChange={(e) => setFormHab({...formHab, nombre: e.target.value})}
                    />
                    <select 
                      className="w-full px-3 py-2 rounded-lg border border-slate-200"
                      value={formHab.nivel}
                      onChange={(e) => setFormHab({...formHab, nivel: e.target.value})}
                    >
                      <option value="Basico">Básico</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                      <option value="Experto">Experto</option>
                    </select>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={guardarHabilidad} disabled={guardando || !formHab.nombre}>
                        <Plus className="h-4 w-4 mr-1" />
                        Agregar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditandoHab(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {!editandoHab && (
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => setEditandoHab(true)}>
                    <Plus className="h-4 w-4" />
                    Add Skill
                  </Button>
                )}

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-2">Suggested skills</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills.map((skill) => (
                      <SkillTag key={skill} skill={skill} variant="suggested" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* EXPERIENCE */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Experience</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => { setFormExp({ empresa: '', cargo: '', anio_inicio: '', anio_fin: '' }); setEditandoExp('nuevo') }}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {experienciaData.length > 0 ? experienciaData.map((exp) => (
                  <div key={exp.id_experiencia} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{exp.cargo}</h4>
                      <p className="text-sm text-slate-600">{exp.empresa}</p>
                      <p className="text-xs text-slate-400">{exp.anio_inicio} - {exp.anio_fin || 'Presente'}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 italic">Sin experiencia laboral</p>
                )}

                {(editandoExp === 'nuevo' || editandoExp) && (
                  <div className="border-t pt-4 space-y-3">
                    <Input 
                      placeholder="Empresa"
                      value={formExp.empresa}
                      onChange={(e) => setFormExp({...formExp, empresa: e.target.value})}
                    />
                    <Input 
                      placeholder="Cargo"
                      value={formExp.cargo}
                      onChange={(e) => setFormExp({...formExp, cargo: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Año inicio"
                        type="number"
                        value={formExp.anio_inicio}
                        onChange={(e) => setFormExp({...formExp, anio_inicio: e.target.value})}
                      />
                      <Input 
                        placeholder="Año fin"
                        type="number"
                        value={formExp.anio_fin}
                        onChange={(e) => setFormExp({...formExp, anio_fin: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={guardarExperiencia} disabled={guardando || !formExp.empresa || !formExp.cargo}>
                        <Save className="h-4 w-4 mr-1" />
                        Guardar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditandoExp(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* EDUCATION */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Education</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => { setFormEdu({ institucion: '', titulo: '', anio_inicio: '', anio_fin: '' }); setEditandoEdu('nuevo') }}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {educacionData.length > 0 ? educacionData.map((edu) => (
                  <div key={edu.id_educacion} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{edu.titulo}</h4>
                      <p className="text-sm text-slate-600">{edu.institucion}</p>
                      <p className="text-xs text-slate-400">{edu.anio_inicio} - {edu.anio_fin || 'Presente'}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 italic">Sin educación agregada</p>
                )}

                {(editandoEdu === 'nuevo' || editandoEdu) && (
                  <div className="border-t pt-4 space-y-3">
                    <Input 
                      placeholder="Institución"
                      value={formEdu.institucion}
                      onChange={(e) => setFormEdu({...formEdu, institucion: e.target.value})}
                    />
                    <Input 
                      placeholder="Título"
                      value={formEdu.titulo}
                      onChange={(e) => setFormEdu({...formEdu, titulo: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Año inicio"
                        type="number"
                        value={formEdu.anio_inicio}
                        onChange={(e) => setFormEdu({...formEdu, anio_inicio: e.target.value})}
                      />
                      <Input 
                        placeholder="Año fin"
                        type="number"
                        value={formEdu.anio_fin}
                        onChange={(e) => setFormEdu({...formEdu, anio_fin: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={guardarEducacion} disabled={guardando || !formEdu.institucion || !formEdu.titulo}>
                        <Save className="h-4 w-4 mr-1" />
                        Guardar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditandoEdu(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* RESUME */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Resume / CV</CardTitle>
              </CardHeader>
              <CardContent>
                {perfil.hoja_vida ? (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{perfil.hoja_vida}</p>
                      <p className="text-xs text-slate-500">Subido</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-400 mb-3">Sin CV subido</p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Subir CV
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <aside className="col-span-3 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  People also viewed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {peopleViewed.map((person, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-slate-500">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{person.name}</p>
                      <p className="text-xs text-slate-500 truncate">{person.title}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  Suggested companies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestedCompanies.map((company, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{company.name}</p>
                        <p className="text-xs text-slate-500">{company.followers} followers</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
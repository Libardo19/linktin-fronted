'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Plus, X, Rocket, Save } from 'lucide-react'
import Link from 'next/link'
import { ofertaService } from '@/services/oferta.service'
import { empresaService } from '@/services/empresa.service'

export default function NuevaOfertaPage() {
  const router = useRouter()
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    requisitos: '',
    ubicacion: '',
    modalidad: 'Remote',
    tipo_empleo: 'Full-time',
    salario_min: '',
    salario_max: '',
    skills: [],
  })
  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    empresaService.getMiPerfil()
      .then((data) => setPerfil(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const addSkill = () => {
    const skill = skillInput.trim()
    if (skill && !form.skills.includes(skill)) {
      setForm({ ...form, skills: [...form.skills, skill] })
      setSkillInput('')
    }
  }

  const removeSkill = (skill) => {
    setForm({ ...form, skills: form.skills.filter(s => s !== skill) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.titulo || !form.descripcion) {
      setError('Por favor completa los campos requeridos')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await ofertaService.create({
        titulo: form.titulo,
        descripcion: form.descripcion,
        requisitos: form.requisitos,
        ubicacion: form.ubicacion,
        modalidad: form.modalidad,
        tipo_empleo: form.tipo_empleo,
        pago: form.salario_max
          ? `${form.salario_min} - ${form.salario_max}`
          : form.salario_min,
      })
      router.push('/dashboardempresa/ofertas')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la oferta')
    } finally {
      setSubmitting(false)
    }
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
              activeJobPosts={perfil?.ofertas?.length || 0}
              totalCandidates={0}
              newMatches={0}
              profileCompletion={perfil?.biografia ? 85 : 45}
            />
          </aside>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Post New Job</h1>
              <p className="text-sm text-slate-500 mt-1">Create a new job posting to attract candidates</p>
            </div>

            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </CardContent>
              </Card>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Frontend Developer"
                      value={form.titulo}
                      onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the role, responsibilities, and requirements..."
                      rows={6}
                      value={form.descripcion}
                      onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="List the required skills and qualifications..."
                      rows={4}
                      value={form.requisitos}
                      onChange={(e) => setForm({ ...form, requisitos: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location & Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location & Employment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location Type</Label>
                      <select
                        className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.modalidad}
                        onChange={(e) => setForm({ ...form, modalidad: e.target.value })}
                      >
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <select
                        className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.tipo_empleo}
                        onChange={(e) => setForm({ ...form, tipo_empleo: e.target.value })}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="e.g., Bogotá, Colombia"
                      value={form.ubicacion}
                      onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Salary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Salary Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Minimum Salary</Label>
                      <Input
                        type="number"
                        placeholder="$0"
                        value={form.salario_min}
                        onChange={(e) => setForm({ ...form, salario_min: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum Salary</Label>
                      <Input
                        type="number"
                        placeholder="$0"
                        value={form.salario_max}
                        onChange={(e) => setForm({ ...form, salario_max: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" variant="outline" onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {form.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-2"
                        >
                          {skill}
                          <button type="button" onClick={() => removeSkill(skill)} className="hover:text-blue-900">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                      {form.skills.length === 0 && (
                        <p className="text-xs text-slate-400">No skills added yet</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <Link href="/dashboardempresa/ofertas">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    'Creating...'
                  ) : (
                    <>
                      <Rocket className="h-4 w-4 mr-2" />
                      Post Job
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

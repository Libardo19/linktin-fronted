'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Upload } from 'lucide-react'
import { empresaService } from '@/services/empresa.service'
import { sectorService } from '@/services/sector.service'
import { storageService } from '@/services/storage.service'

export default function PerfilEmpresaForm({ perfil, onPerfilActualizado, modo = 'crear' }) {
  const [loading, setLoading] = useState(modo === 'crear')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [subiendoLogo, setSubiendoLogo] = useState(false)
  const [sectores, setSectores] = useState([])
  const logoInputRef = useRef(null)
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    website: '',
    logo_url: '',
    id_sector: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectoresData = await sectorService.getAll()
        setSectores(sectoresData || [])
        if (perfil) {
          setForm({
            nombre: perfil.nombre || '',
            descripcion: perfil.descripcion || perfil.biografia || '',
            ubicacion: perfil.ubicacion || '',
            website: perfil.website || '',
            logo_url: perfil.logo_url || '',
            id_sector: perfil.id_sector || perfil.sector?.id_sector || '',
          })
        }
      } catch (err) {
        console.error('Error al cargar datos:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [perfil])

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendoLogo(true)
    try {
      const result = await storageService.uploadFile('logo', file)
      setForm(prev => ({ ...prev, logo_url: result.url }))
      if (perfil && onPerfilActualizado) {
        onPerfilActualizado({ ...perfil, logo_url: result.url })
      }
    } catch (err) {
      setError('Error al subir el logo')
    } finally {
      setSubiendoLogo(false)
      if (logoInputRef.current) logoInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre) {
      setError('El nombre de la empresa es requerido')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      if (modo === 'crear') {
        const data = await empresaService.create({
          nombre: form.nombre,
          descripcion: form.descripcion,
          ubicacion: form.ubicacion,
          website: form.website,
          logo_url: form.logo_url,
          id_sector: form.id_sector || undefined,
        })
        onPerfilActualizado(data)
      } else {
        const empresaId = perfil?.id_empresa || perfil?.id
        const data = await empresaService.update(empresaId, {
          nombre: form.nombre,
          descripcion: form.descripcion,
          ubicacion: form.ubicacion,
          website: form.website,
          logo_url: form.logo_url,
          id_sector: form.id_sector || undefined,
        })
        onPerfilActualizado(data)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el perfil')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-sm text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información de la Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Empresa *</Label>
            <Input
              id="nombre"
              placeholder="Ej: TechCorp"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Describe tu empresa, misión y valores..."
              rows={4}
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <select
              id="sector"
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.id_sector}
              onChange={(e) => setForm({ ...form, id_sector: e.target.value })}
            >
              <option value="">Seleccionar sector</option>
              {sectores.map((s) => (
                <option key={s.id_sector} value={s.id_sector}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Input
              id="ubicacion"
              placeholder="Ej: Bogotá, Colombia"
              value={form.ubicacion}
              onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Sitio Web</Label>
            <Input
              id="website"
              placeholder="https://tusitio.com"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Logo de la Empresa</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-slate-100 border-2 border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                {form.logo_url ? (
                  <img src={form.logo_url} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-slate-300">
                    {form.nombre?.charAt(0) || '?'}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 mb-2">JPG, PNG o WebP. Máximo 2 MB.</p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  ref={logoInputRef}
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button type="button" variant="outline" size="sm" onClick={() => logoInputRef.current?.click()} disabled={subiendoLogo}>
                  <Upload className="h-4 w-4 mr-1" />
                  {subiendoLogo ? 'Subiendo...' : form.logo_url ? 'Cambiar logo' : 'Subir logo'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting
            ? 'Guardando...'
            : modo === 'crear'
              ? 'Crear Perfil'
              : 'Guardar Cambios'
          }
        </Button>
      </div>
    </form>
  )
}

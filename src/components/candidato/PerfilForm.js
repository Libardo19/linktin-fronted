'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { candidatoService } from '@/services/candidato.service'
import { useAuth } from '@/context/AuthContext'

export default function PerfilForm({ perfil, onPerfilCreado, onPerfilActualizado, modo }) {
  const { usuario } = useAuth()
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    biografia: '',
    ubicacion: '',
    portafolio_url: '',
    github_url: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (perfil) {
      setFormData({
        nombres: perfil.nombres || '',
        apellidos: perfil.apellidos || '',
        biografia: perfil.biografia || '',
        ubicacion: perfil.ubicacion || '',
        portafolio_url: perfil.portafolio_url || '',
        github_url: perfil.github_url || '',
      })
    }
  }, [perfil])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (modo === 'editar' || perfil) {
        const actualizado = await candidatoService.updatePerfil(perfil.id_candidato, formData)
        if (onPerfilActualizado) onPerfilActualizado(actualizado)
        setSuccess('Perfil actualizado correctamente')
      } else {
        const creado = await candidatoService.createPerfil(formData)
        if (onPerfilCreado) onPerfilCreado(creado)
        setSuccess('Perfil creado correctamente')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el perfil')
    } finally {
      setLoading(false)
    }
  }

  const titulo = perfil ? 'Editar mi perfil' : 'Crear mi perfil'
  const boton = perfil ? 'Guardar cambios' : 'Crear perfil'

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombres">Nombres</Label>
              <Input
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                placeholder="Tus nombres"
                required
              />
            </div>
            <div>
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Tus apellidos"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Input
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              placeholder="Ciudad, País"
            />
          </div>

          <div>
            <Label htmlFor="biografia">Biografía</Label>
            <Textarea
              id="biografia"
              name="biografia"
              value={formData.biografia}
              onChange={handleChange}
              placeholder="Cuéntanos sobre ti, tu experiencia y objetivos profesionales..."
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="portafolio_url">Portafolio URL</Label>
            <Input
              id="portafolio_url"
              name="portafolio_url"
              value={formData.portafolio_url}
              onChange={handleChange}
              placeholder="https://tuportafolio.com"
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input
              id="github_url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              placeholder="https://github.com/tuusuario"
              type="url"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
              {success}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Guardando...' : boton}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
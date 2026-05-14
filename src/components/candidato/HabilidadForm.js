'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { candidatoService } from '@/services/candidato.service'
import { Plus } from 'lucide-react'

export default function HabilidadForm({ idCandidato, onActualizado }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Desarrollo',
    nivel: 'Intermedio',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

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
      await candidatoService.addHabilidad(idCandidato, formData)
      setSuccess('Habilidad agregada correctamente')
      setFormData({ nombre: '', categoria: 'Desarrollo', nivel: 'Intermedio' })
      if (onActualizado) onActualizado()
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar habilidad')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nombre">Nombre de la habilidad</Label>
        <Input
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: JavaScript, Python, React"
          required
        />
      </div>

      <div>
        <Label htmlFor="categoria">Categoría</Label>
        <select
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
        >
          <option value="Desarrollo">Desarrollo</option>
          <option value="Diseño">Diseño</option>
          <option value="Datos">Datos</option>
          <option value="DevOps">DevOps</option>
          <option value="Gestion">Gestión</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <Label htmlFor="nivel">Nivel</Label>
        <select
          id="nivel"
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
        >
          <option value="Basico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
          <option value="Experto">Experto</option>
        </select>
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
        <Plus className="h-4 w-4 mr-1" />
        {loading ? 'Agregando...' : 'Agregar Habilidad'}
      </Button>
    </form>
  )
}
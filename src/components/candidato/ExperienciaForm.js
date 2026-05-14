'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { candidatoService } from '@/services/candidato.service'
import { Plus, Trash2 } from 'lucide-react'

export default function ExperienciaForm({ idCandidato, experiencia, onActualizado }) {
  const [formData, setFormData] = useState({
    empresa: '',
    cargo: '',
    anio_inicio: '',
    anio_fin: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editandoId, setEditandoId] = useState(null)

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
      if (editandoId) {
        await candidatoService.updateExperiencia(idCandidato, editandoId, formData)
        setSuccess('Experiencia actualizada')
      } else {
        await candidatoService.addExperiencia(idCandidato, formData)
        setSuccess('Experiencia agregada')
      }
      setFormData({ empresa: '', cargo: '', anio_inicio: '', anio_fin: '' })
      setEditandoId(null)
      if (onActualizado) onActualizado()
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar experiencia')
    } finally {
      setLoading(false)
    }
  }

  const handleEditar = (exp) => {
    setFormData({
      empresa: exp.empresa,
      cargo: exp.cargo,
      anio_inicio: exp.anio_inicio?.toString() || '',
      anio_fin: exp.anio_fin?.toString() || '',
    })
    setEditandoId(exp.id_experiencia)
  }

  const handleEliminar = async (expId) => {
    if (!confirm('¿Estás seguro de eliminar esta experiencia?')) return
    try {
      await candidatoService.deleteExperiencia(idCandidato, expId)
      if (onActualizado) onActualizado()
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar experiencia')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Experiencia Laboral</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {experiencia?.length > 0 && (
          <div className="space-y-3 mb-4">
            {experiencia.map((exp) => (
              <div key={exp.id_experiencia} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{exp.cargo}</p>
                  <p className="text-sm text-slate-600">{exp.empresa}</p>
                  <p className="text-xs text-slate-400">{exp.anio_inicio} - {exp.anio_fin || 'Presente'}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditar(exp)}>Editar</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEliminar(exp.id_experiencia)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 border-t pt-4">
          <h4 className="text-sm font-medium">{editandoId ? 'Editar experiencia' : 'Agregar experiencia'}</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="empresa">Empresa</Label>
              <Input id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} placeholder="Nombre de la empresa" required />
            </div>
            <div>
              <Label htmlFor="cargo">Cargo</Label>
              <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Tu cargo" required />
            </div>
            <div>
              <Label htmlFor="anio_inicio">Año inicio</Label>
              <Input id="anio_inicio" name="anio_inicio" type="number" value={formData.anio_inicio} onChange={handleChange} placeholder="2020" required />
            </div>
            <div>
              <Label htmlFor="anio_fin">Año fin</Label>
              <Input id="anio_fin" name="anio_fin" type="number" value={formData.anio_fin} onChange={handleChange} placeholder="2024" />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              {editandoId ? 'Actualizar' : 'Agregar'}
            </Button>
            {editandoId && (
              <Button type="button" variant="outline" size="sm" onClick={() => { setEditandoId(null); setFormData({ empresa: '', cargo: '', anio_inicio: '', anio_fin: '' }) }}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
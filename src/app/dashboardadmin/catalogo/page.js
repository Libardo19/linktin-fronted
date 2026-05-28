'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Tags, Plus, Pencil, Trash2, Search } from 'lucide-react'
import api from '@/lib/axios'

export default function CatalogoPage() {
  const [activeTab, setActiveTab] = useState('habilidades')
  const [search, setSearch] = useState('')
  const [habilidades, setHabilidades] = useState([])
  const [sectores, setSectores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(null)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevaCategoria, setNuevaCategoria] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)

  const cargarHabilidades = async () => {
    try {
      const { data } = await api.get('/api/habilidades')
      setHabilidades(data.data || [])
    } catch (err) { console.error(err) }
  }

  const cargarSectores = async () => {
    try {
      const { data } = await api.get('/api/sectores')
      setSectores(data.data || [])
    } catch (err) { console.error(err) }
  }

  const cargarDatos = async () => {
    setCargando(true)
    await Promise.all([cargarHabilidades(), cargarSectores()])
    setCargando(false)
  }

  useEffect(() => { cargarDatos() }, [])

  const filteredHabilidades = habilidades.filter(h =>
    h.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    h.categoria?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredSectores = sectores.filter(s =>
    s.nombre?.toLowerCase().includes(search.toLowerCase())
  )

  const handleCrearHabilidad = async () => {
    if (!nuevoNombre.trim()) return
    try {
      await api.post('/api/habilidades', { nombre: nuevoNombre, categoria: nuevaCategoria || null })
      setNuevoNombre('')
      setNuevaCategoria('')
      setMostrarForm(false)
      await cargarHabilidades()
    } catch (err) { alert('Error al crear habilidad') }
  }

  const handleEditarHabilidad = async (id) => {
    if (!nuevoNombre.trim()) return
    try {
      await api.put(`/api/habilidades/${id}`, { nombre: nuevoNombre, categoria: nuevaCategoria || null })
      setEditando(null)
      setNuevoNombre('')
      setNuevaCategoria('')
      await cargarHabilidades()
    } catch (err) { alert('Error al editar habilidad') }
  }

  const handleEliminarHabilidad = async (id) => {
    if (!confirm('¿Eliminar esta habilidad?')) return
    try {
      await api.delete(`/api/habilidades/${id}`)
      await cargarHabilidades()
    } catch (err) { alert('Error al eliminar habilidad') }
  }

  const handleCrearSector = async () => {
    if (!nuevoNombre.trim()) return
    try {
      await api.post('/api/sectores', { nombre: nuevoNombre, descripcion: nuevaCategoria || null })
      setNuevoNombre('')
      setNuevaCategoria('')
      setMostrarForm(false)
      await cargarSectores()
    } catch (err) { alert('Error al crear sector') }
  }

  const handleEditarSector = async (id) => {
    if (!nuevoNombre.trim()) return
    try {
      await api.put(`/api/sectores/${id}`, { nombre: nuevoNombre, descripcion: nuevaCategoria || null })
      setEditando(null)
      setNuevoNombre('')
      setNuevaCategoria('')
      await cargarSectores()
    } catch (err) { alert('Error al editar sector') }
  }

  const handleEliminarSector = async (id) => {
    if (!confirm('¿Eliminar este sector?')) return
    try {
      await api.delete(`/api/sectores/${id}`)
      await cargarSectores()
    } catch (err) { alert('Error al eliminar sector') }
  }

  const iniciarEdicion = (item) => {
    setEditando(item.id_habilidades || item.id_sector)
    setNuevoNombre(item.nombre)
    setNuevaCategoria(item.categoria || item.descripcion || '')
    setMostrarForm(true)
  }

  const handleGuardar = () => {
    if (editando) {
      if (activeTab === 'habilidades') handleEditarHabilidad(editando)
      else handleEditarSector(editando)
    } else {
      if (activeTab === 'habilidades') handleCrearHabilidad()
      else handleCrearSector()
    }
  }

  const cancelarForm = () => {
    setEditando(null)
    setNuevoNombre('')
    setNuevaCategoria('')
    setMostrarForm(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="catalogo" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Catálogo</h1>
            <p className="text-sm text-slate-500">Gestión de habilidades y sectores</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button size="sm" onClick={() => { setMostrarForm(true); setEditando(null); setNuevoNombre(''); setNuevaCategoria('') }}>
              <Plus className="h-4 w-4 mr-1" />
              {activeTab === 'habilidades' ? 'Nueva Habilidad' : 'Nuevo Sector'}
            </Button>
          </div>
        </div>

        {mostrarForm && (
          <Card className="mb-6 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Nombre</label>
                  <Input
                    placeholder="Nombre"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-slate-600 mb-1 block">
                    {activeTab === 'habilidades' ? 'Categoría' : 'Descripción'}
                  </label>
                  <Input
                    placeholder={activeTab === 'habilidades' ? 'Ej: Frontend' : 'Descripción del sector'}
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                  />
                </div>
                <Button size="sm" onClick={handleGuardar}>
                  {editando ? 'Guardar' : 'Crear'}
                </Button>
                <Button variant="outline" size="sm" onClick={cancelarForm}>Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'habilidades' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setActiveTab('habilidades'); setMostrarForm(false) }}
          >
            Habilidades
          </Button>
          <Button
            variant={activeTab === 'sectores' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setActiveTab('sectores'); setMostrarForm(false) }}
          >
            Sectores
          </Button>
        </div>

        {activeTab === 'habilidades' ? (
          <Card>
            <CardContent className="p-0">
              {cargando ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Habilidad</th>
                      <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Categoría</th>
                      <th className="text-center text-xs font-medium text-slate-500 py-3 px-4">Veces usada</th>
                      <th className="text-right text-xs font-medium text-slate-500 py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHabilidades.map((h) => (
                      <tr key={h.id_habilidades} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Tags className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-900">{h.nombre}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="text-xs">{h.categoria || '-'}</Badge>
                        </td>
                        <td className="py-3 px-4 text-center text-sm text-slate-500">
                          {h._count ? h._count.habilidades_empleado + h._count.habilidades_ofertas : 0}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" title="Editar" onClick={() => iniciarEdicion(h)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Eliminar" onClick={() => handleEliminarHabilidad(h.id_habilidades)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              {cargando ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Sector</th>
                      <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Descripción</th>
                      <th className="text-center text-xs font-medium text-slate-500 py-3 px-4">Empresas asociadas</th>
                      <th className="text-right text-xs font-medium text-slate-500 py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSectores.map((s) => (
                      <tr key={s.id_sector} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{s.nombre}</td>
                        <td className="py-3 px-4 text-sm text-slate-500">{s.descripcion || '-'}</td>
                        <td className="py-3 px-4 text-center text-sm text-slate-500">
                          {s._count?.perfil_empresas ?? 0}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" title="Editar" onClick={() => iniciarEdicion(s)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Eliminar" onClick={() => handleEliminarSector(s.id_sector)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Users, Eye, Ban, CheckCircle } from 'lucide-react'
import { adminService } from '@/services/admin.service'

export default function CandidatosPage() {
  const [candidatos, setCandidatos] = useState([])
  const [search, setSearch] = useState('')
  const [cargando, setCargando] = useState(true)

  const cargarCandidatos = async () => {
    try {
      const data = await adminService.getCandidatos()
      setCandidatos(data)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargarCandidatos() }, [])

  const handleSuspender = async (id) => {
    if (!confirm('¿Estás seguro de suspender este candidato?')) return
    try {
      await adminService.suspenderUsuario(id)
      await cargarCandidatos()
    } catch (err) {
      alert('Error al suspender candidato')
    }
  }

  const handleActivar = async (id) => {
    if (!confirm('¿Estás seguro de activar este candidato?')) return
    try {
      await adminService.activarUsuario(id)
      await cargarCandidatos()
    } catch (err) {
      alert('Error al activar candidato')
    }
  }

  const filtered = candidatos.filter(c =>
    `${c.nombres} ${c.apellidos}`.toLowerCase().includes(search.toLowerCase()) ||
    c.usuario?.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="candidatos" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Candidatos</h1>
            <p className="text-sm text-slate-500">Gestión de perfiles de candidatos</p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar candidatos..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

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
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Nombre</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Email</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Ubicación</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Skills</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Estado</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Registro</th>
                    <th className="text-right text-xs font-medium text-slate-500 py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id_candidato} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">
                        {c.nombres} {c.apellidos}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{c.usuario?.email}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{c.ubicacion || '-'}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {c.habilidadEmpleados?.length > 0 ? (
                            c.habilidadEmpleados.map((he) => (
                              <Badge key={he.habilidad.id_habilidades} variant="secondary" className="text-xs">
                                {he.habilidad.nombre}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400">Sin skills</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={c.usuario?.activo ? 'success' : 'destructive'} className="text-xs">
                          {c.usuario?.activo ? 'activo' : 'suspendido'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">
                        {c.usuario?.fecha_creacion ? new Date(c.usuario.fecha_creacion).toLocaleDateString('es-CO') : '-'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Ver perfil">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {c.usuario?.activo ? (
                            <Button variant="ghost" size="icon" title="Suspender" onClick={() => handleSuspender(c.id_candidato)}>
                              <Ban className="h-4 w-4 text-red-500" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" title="Activar" onClick={() => handleActivar(c.id_candidato)}>
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

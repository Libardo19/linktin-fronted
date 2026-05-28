'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Building2, Eye, Ban, CheckCircle } from 'lucide-react'
import { adminService } from '@/services/admin.service'

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([])
  const [search, setSearch] = useState('')
  const [cargando, setCargando] = useState(true)

  const cargarEmpresas = async () => {
    try {
      const data = await adminService.getEmpresas()
      setEmpresas(data)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargarEmpresas() }, [])

  const handleSuspender = async (id_usuarios) => {
    if (!confirm('¿Estás seguro de suspender esta empresa?')) return
    try {
      await adminService.suspenderUsuario(id_usuarios)
      await cargarEmpresas()
    } catch (err) {
      alert('Error al suspender empresa')
    }
  }

  const handleActivar = async (id_usuarios) => {
    if (!confirm('¿Estás seguro de activar esta empresa?')) return
    try {
      await adminService.activarUsuario(id_usuarios)
      await cargarEmpresas()
    } catch (err) {
      alert('Error al activar empresa')
    }
  }

  const filtered = empresas.filter(e =>
    e.nombre.toLowerCase().includes(search.toLowerCase()) ||
    e.usuario?.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="empresas" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Empresas</h1>
            <p className="text-sm text-slate-500">Gestión de perfiles de empresas</p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar empresas..."
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
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Empresa</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Email</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Sector</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Ubicación</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Estado</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Registro</th>
                    <th className="text-right text-xs font-medium text-slate-500 py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id_empresas} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-indigo-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{e.nombre}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{e.usuario?.email}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{e.sector?.nombre || '-'}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{e.ubicacion || '-'}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={e.usuario?.activo ? 'success' : 'destructive'}
                          className="text-xs"
                        >
                          {e.usuario?.activo ? 'activo' : 'suspendido'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">
                        {e.usuario?.fecha_creacion ? new Date(e.usuario.fecha_creacion).toLocaleDateString('es-CO') : '-'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Ver perfil">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {e.usuario?.activo ? (
                            <Button variant="ghost" size="icon" title="Suspender" onClick={() => handleSuspender(e.usuario.id_usuarios || e.id_empresas)}>
                              <Ban className="h-4 w-4 text-red-500" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" title="Activar" onClick={() => handleActivar(e.usuario.id_usuarios || e.id_empresas)}>
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

'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Shield, UserX, CheckCircle, Users } from 'lucide-react'
import { adminService } from '@/services/admin.service'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [search, setSearch] = useState('')
  const [cargando, setCargando] = useState(true)

  const cargarUsuarios = async () => {
    try {
      const data = await adminService.getUsuarios()
      setUsuarios(data)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargarUsuarios() }, [])

  const handleSuspender = async (id) => {
    if (!confirm('¿Estás seguro de suspender este usuario?')) return
    try {
      await adminService.suspenderUsuario(id)
      await cargarUsuarios()
    } catch (err) {
      alert('Error al suspender usuario')
    }
  }

  const handleActivar = async (id) => {
    if (!confirm('¿Estás seguro de activar este usuario?')) return
    try {
      await adminService.activarUsuario(id)
      await cargarUsuarios()
    } catch (err) {
      alert('Error al activar usuario')
    }
  }

  const getNombre = (u) => {
    if (u.perfil_candidato) return `${u.perfil_candidato.nombres} ${u.perfil_candidato.apellidos}`
    if (u.perfil_empresa) return u.perfil_empresa.nombre
    return u.email
  }

  const filtered = usuarios.filter(u =>
    getNombre(u).toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="usuarios" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>
            <p className="text-sm text-slate-500">Gestión de todos los usuarios de la plataforma</p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar usuarios..."
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
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Usuario</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Email</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Tipo</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Estado</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Registro</th>
                    <th className="text-right text-xs font-medium text-slate-500 py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id_usuarios} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <Users className="h-4 w-4 text-slate-500" />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{getNombre(u)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{u.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant={u.tipo === 'empresa' ? 'secondary' : 'default'} className="capitalize text-xs">
                          {u.tipo}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={u.activo ? 'success' : 'destructive'}
                          className="text-xs"
                        >
                          {u.activo ? 'activo' : 'suspendido'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">
                        {new Date(u.fecha_creacion).toLocaleDateString('es-CO')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Ver detalles">
                            <Shield className="h-4 w-4" />
                          </Button>
                          {u.activo ? (
                            <Button variant="ghost" size="icon" title="Suspender" onClick={() => handleSuspender(u.id_usuarios)}>
                              <UserX className="h-4 w-4 text-red-500" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" title="Activar" onClick={() => handleActivar(u.id_usuarios)}>
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

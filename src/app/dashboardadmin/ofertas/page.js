'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Search, Briefcase, Eye, CheckCircle, XCircle } from 'lucide-react'
import { adminService } from '@/services/admin.service'

export default function AdminOfertasPage() {
  const [ofertas, setOfertas] = useState([])
  const [search, setSearch] = useState('')
  const [cargando, setCargando] = useState(true)

  const cargarOfertas = async () => {
    try {
      const data = await adminService.getOfertas()
      setOfertas(data)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargarOfertas() }, [])

  const handleAprobar = async (id) => {
    if (!confirm('¿Aprobar esta oferta?')) return
    try {
      await adminService.cambiarEstadoOferta(id, 'activa')
      await cargarOfertas()
    } catch (err) {
      alert('Error al aprobar oferta')
    }
  }

  const handleRechazar = async (id) => {
    if (!confirm('¿Rechazar esta oferta?')) return
    try {
      await adminService.cambiarEstadoOferta(id, 'cerrada')
      await cargarOfertas()
    } catch (err) {
      alert('Error al rechazar oferta')
    }
  }

  const filtered = ofertas.filter(o =>
    o.titulo.toLowerCase().includes(search.toLowerCase()) ||
    o.perfil_empresa?.nombre?.toLowerCase().includes(search.toLowerCase())
  )

  const getEstadoBadge = (estado) => {
    const variants = {
      activa: 'success',
      cerrada: 'destructive',
      pausada: 'secondary',
    }
    return (
      <Badge variant={variants[estado] || 'secondary'} className="text-xs">
        {estado}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="ofertas" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Ofertas</h1>
            <p className="text-sm text-slate-500">Moderación de ofertas laborales</p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar ofertas..."
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
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Título</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Empresa</th>
                    <th className="text-center text-xs font-medium text-slate-500 py-3 px-4">Modalidad</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Estado</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Fecha</th>
                    <th className="text-right text-xs font-medium text-slate-500 py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr key={o.id_ofertas} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-amber-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{o.titulo}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{o.perfil_empresa?.nombre || '-'}</td>
                      <td className="py-3 px-4 text-center text-sm text-slate-500">{o.modalidad}</td>
                      <td className="py-3 px-4">{getEstadoBadge(o.estado)}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">
                        {new Date(o.fecha_publicacion).toLocaleDateString('es-CO')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Ver detalle">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {o.estado === 'pausada' || o.estado === 'activa' ? (
                            <Button variant="ghost" size="icon" title="Cerrar" onClick={() => handleRechazar(o.id_ofertas)}>
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          ) : null}
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

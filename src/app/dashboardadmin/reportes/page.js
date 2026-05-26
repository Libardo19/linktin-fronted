'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Flag, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react'
import api from '@/lib/axios'

export default function ReportesPage() {
  const [notificaciones, setNotificaciones] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        const { data } = await api.get('/api/notificaciones')
        setNotificaciones(data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarNotificaciones()
  }, [])

  const notificacionesPendientes = notificaciones.filter(n => !n.leido)

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="reportes" notificationCount={notificacionesPendientes.length} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>
          <p className="text-sm text-slate-500">Moderación de reportes de usuarios</p>
        </div>

        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm">
                El módulo de reportes de usuarios estará disponible próximamente.
                Por ahora se muestran las notificaciones pendientes del sistema.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Flag className="h-5 w-5 text-slate-400" />
              Notificaciones pendientes
            </CardTitle>
            <CardDescription>Últimas notificaciones sin leer en el sistema</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {cargando ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : notificacionesPendientes.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No hay notificaciones pendientes</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Tipo</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Mensaje</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {notificacionesPendientes.map((n) => (
                    <tr key={n.id_notificaciones} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">{n.tipo}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {n.payload?.mensaje || JSON.stringify(n.payload) || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">
                        {new Date(n.fecha_creacion).toLocaleDateString('es-CO')}
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

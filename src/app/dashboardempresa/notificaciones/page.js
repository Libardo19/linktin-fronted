'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { NotificationItem } from '@/components/linktin/NotificationItem'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { notificacionesService } from '@/services/notificaciones.service'
import { matchService } from '@/services/match.service'

export default function NotificacionesEmpresaPage() {
  const [notificaciones, setNotificaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotificaciones = async () => {
    try {
      const data = await notificacionesService.getMisNotificaciones()
      const list = data || []
      setNotificaciones(list)
      setUnreadCount(list.filter((n) => !n.leida).length)
    } catch (err) {
      console.error('Error al cargar notificaciones:', err)
      setNotificaciones([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotificaciones()
  }, [])

  const handleMarcarLeida = async (id) => {
    try {
      await notificacionesService.marcarLeida(id)
      setNotificaciones((prev) =>
        prev.map((n) => (n.id_notificacion === id ? { ...n, leida: true } : n))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      console.error('Error al marcar como leída:', err)
    }
  }

  const handleMarcarTodasLeidas = async () => {
    try {
      await notificacionesService.marcarTodasLeidas()
      setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error('Error al marcar todas como leídas:', err)
    }
  }

  const getNotificationType = (tipo) => {
    const typeMap = {
      match_aceptado: 'match',
      match_rechazado: 'match',
      match_nuevo: 'match',
      nueva_oferta: 'job',
      oferta_cerrada: 'job',
      postulacion_nueva: 'view',
    }
    return typeMap[tipo] || 'match'
  }

  const formatTimestamp = (fecha) => {
    if (!fecha) return ''
    const date = new Date(fecha)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Ahora'
    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays < 7) return `Hace ${diffDays}d`
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
  }

  const filteredNotificaciones = notificaciones.filter((notif) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'matches') return getNotificationType(notif.tipo) === 'match'
    if (activeFilter === 'jobs') return getNotificationType(notif.tipo) === 'job'
    return false
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="notifications" notificationCount={unreadCount} type="empresa" />

      <main className="max-w-[800px] mx-auto px-4 py-6 pt-20">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Notificaciones</h1>

        <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
          {['all', 'matches', 'jobs'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="capitalize whitespace-nowrap"
            >
              {filter === 'all' ? 'Todas' : filter === 'matches' ? 'Matches' : 'Ofertas'}
            </Button>
          ))}
        </div>

        <Card className="overflow-hidden">
          {filteredNotificaciones.length > 0 ? (
            filteredNotificaciones.map((notif) => (
              <NotificationItem
                key={notif.id_notificacion}
                type={getNotificationType(notif.tipo)}
                title={notif.mensaje || 'Notificación'}
                description={notif.descripcion || ''}
                timestamp={formatTimestamp(notif.fecha_creacion || notif.createdAt)}
                isUnread={!notif.leida}
                onAction={() => handleMarcarLeida(notif.id_notificacion)}
                actionLabel="Marcar leída"
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-500">No hay notificaciones en esta categoría</p>
            </div>
          )}
        </Card>

        {unreadCount > 0 && (
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm" onClick={handleMarcarTodasLeidas}>
              Marcar todas como leídas
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

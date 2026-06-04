'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { connectSocket } from '@/services/socket.service'
import { notificacionesService } from '@/services/notificaciones.service'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchUnreadCount = useCallback(async () => {
    try {
      const data = await notificacionesService.getMisNotificaciones()
      const list = data?.data || []
      setUnreadCount(list.filter(n => !n.leido).length)
    } catch {
    }
  }, [])

  useEffect(() => {
    fetchUnreadCount()

    const socket = connectSocket()
    if (!socket) return

    const handleNuevaNotificacion = () => {
      setUnreadCount(prev => prev + 1)
    }

    socket.on('nueva_notificacion', handleNuevaNotificacion)

    return () => {
      socket.off('nueva_notificacion', handleNuevaNotificacion)
    }
  }, [fetchUnreadCount])

  return (
    <NotificationContext.Provider value={{ unreadCount, setUnreadCount, fetchUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications debe usarse dentro de <NotificationProvider>')
  return context
}

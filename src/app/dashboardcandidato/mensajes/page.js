'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { chatService } from '@/services/chat.service'
import {
  connectSocket, getSocket, joinConversacion,
  sendMessage, emitTyping, emitStopTyping, disconnectSocket,
} from '@/services/socket.service'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Search, Send, Building2, User, MessageCircle, Star } from 'lucide-react'
import { matchService } from '@/services/match.service'
import { resenaService } from '@/services/resena.service'
import ResenaModal from '@/components/resenas/ResenaModal'

function getOtherUser(conv, userId) {
  return conv.participantes?.find(p => p.id_usuarios !== userId)
}

function getOtherName(conv, userId) {
  const other = getOtherUser(conv, userId)
  if (!other) return 'Usuario'
  if (other.perfil_candidato) {
    return `${other.perfil_candidato.nombres} ${other.perfil_candidato.apellidos}`
  }
  if (other.perfil_empresa) {
    return other.perfil_empresa.nombre
  }
  return other.email || 'Usuario'
}

function getOtherIcon(conv, userId) {
  const other = getOtherUser(conv, userId)
  return other?.perfil_empresa ? Building2 : User
}

function formatTime(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now - d
  const days = Math.floor(diff / 86400000)
  if (days === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  if (days === 1) return 'Yesterday'
  return d.toLocaleDateString()
}

function formatMsgTime(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now - d
  const days = Math.floor(diff / 86400000)
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  if (days === 0) return `Today, ${time}`
  if (days === 1) return `Yesterday, ${time}`
  return `${d.toLocaleDateString()}, ${time}`
}

export default function MensajesPage() {
  const { usuario } = useAuth()
  const searchParams = useSearchParams()
  const [conversaciones, setConversaciones] = useState([])
  const [activeConv, setActiveConv] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [matchesEfectivos, setMatchesEfectivos] = useState([])
  const [misResenas, setMisResenas] = useState([])
  const [showResenaModal, setShowResenaModal] = useState(false)
  const [matchParaResena, setMatchParaResena] = useState(null)
  const [yaResenado, setYaResenado] = useState(null)
  const [enviandoResena, setEnviandoResena] = useState(false)
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef(null)
  const otherTypingTimeoutRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [])

  useEffect(() => {
    if (!usuario) return
    const load = async () => {
      try {
        const data = await chatService.getConversaciones()
        setConversaciones(data || [])

        const targetUserId = searchParams.get('userId')
        if (targetUserId) {
          const conv = await chatService.crearObtenerConversacion(targetUserId)
          setActiveConv(conv)
        }
      } catch (err) {
        console.error('Error loading conversations:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [usuario, searchParams])

  useEffect(() => {
    const socket = connectSocket()
    return () => { disconnectSocket() }
  }, [])

  useEffect(() => {
    if (!activeConv?.id) return
    const socket = getSocket()
    if (!socket?.connected) return

    setMensajes([])
    setOtherUserTyping(false)
    joinConversacion(activeConv.id)

    const onHistorial = (data) => {
      setMensajes(data || [])
      scrollToBottom()
    }

    const onNuevoMensaje = (msg) => {
      setMensajes(prev => {
        if (prev.some(m => m.id_mensajes === msg.id_mensajes)) return prev
        return [...prev, msg]
      })
      setConversaciones(prev => prev.map(c =>
        c.id === activeConv.id
          ? { ...c, mensajes: [msg], updatedAt: msg.fecha_envio }
          : c
      ))
      scrollToBottom()
    }

    const onTyping = ({ userId }) => {
      if (userId !== usuario?.id) {
        setOtherUserTyping(true)
        clearTimeout(otherTypingTimeoutRef.current)
        otherTypingTimeoutRef.current = setTimeout(() => setOtherUserTyping(false), 3000)
      }
    }

    const onStopTyping = ({ userId }) => {
      if (userId !== usuario?.id) {
        setOtherUserTyping(false)
      }
    }

    socket.on('historial_mensajes', onHistorial)
    socket.on('nuevo_mensaje', onNuevoMensaje)
    socket.on('usuario_escribiendo', onTyping)
    socket.on('usuario_dejo_escribir', onStopTyping)

    return () => {
      socket.off('historial_mensajes', onHistorial)
      socket.off('nuevo_mensaje', onNuevoMensaje)
      socket.off('usuario_escribiendo', onTyping)
      socket.off('usuario_dejo_escribir', onStopTyping)
    }
  }, [activeConv?.id, usuario?.id, scrollToBottom])

  /*
    Cuando cambia la conversación activa, busca si hay un match efectivo
    con el otro participante y si ya se dejó reseña en ese match.
  */
  useEffect(() => {
    if (!activeConv || !usuario) {
      setMatchParaResena(null)
      setYaResenado(null)
      return
    }

    const otro = activeConv.participantes?.find(p => p.id_usuarios !== usuario.id)
    if (!otro) return

    const cargarDatos = async () => {
      try {
        const [matches, resenas] = await Promise.all([
          matchService.misMatches(),
          resenaService.getMisResenas(),
        ])
        setMatchesEfectivos(matches || [])
        setMisResenas(resenas || [])

        // Buscar match donde la empresa (perfil_empresa.id_usuarios) sea el otro usuario
        const match = (matches || []).find(
          m => m.oferta?.perfil_empresa?.id_usuarios === otro.id_usuarios
        )
        if (match) {
          setMatchParaResena(match)
          // Verificar si ya reseñó en este match
          const ya = (resenas || []).find(r => r.id_match === match.id_match)
          setYaResenado(ya || null)
        } else {
          setMatchParaResena(null)
          setYaResenado(null)
        }
      } catch {
        setMatchParaResena(null)
        setYaResenado(null)
      }
    }
    cargarDatos()
  }, [activeConv, usuario])

  /*
    Envía la reseña al backend y actualiza el estado local.
  */
  const handleEnviarResena = async ({ raiting, comentario }) => {
    if (!matchParaResena) return
    setEnviandoResena(true)
    try {
      const resena = await resenaService.create(matchParaResena.id_match, raiting, comentario)
      setYaResenado(resena)
      setShowResenaModal(false)
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al enviar la reseña'
      alert(msg)
    } finally {
      setEnviandoResena(false)
    }
  }

  const handleSend = () => {
    if (!newMessage.trim() || !activeConv?.id) return
    sendMessage(activeConv.id, newMessage.trim())
    setNewMessage('')
    emitStopTyping(activeConv.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTyping = () => {
    if (!activeConv?.id) return
    emitTyping(activeConv.id)
    clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => {
      emitStopTyping(activeConv.id)
    }, 2000)
  }

  const filtered = conversaciones.filter(c => {
    if (!searchQuery) return true
    const name = getOtherName(c, usuario?.id).toLowerCase()
    return name.includes(searchQuery.toLowerCase())
  })

  const otherName = activeConv ? getOtherName(activeConv, usuario?.id) : ''
  const OtherIcon = activeConv ? getOtherIcon(activeConv, usuario?.id) : Building2

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="messages" notificationCount={0} type="candidato" />

      <main className="max-w-[1440px] mx-auto h-[calc(100vh-56px)] pt-14">
        <div className="flex h-full border-x border-slate-200 bg-white">
          <div className="w-[380px] border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Mensajes</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar conversaciones..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <MessageCircle className="h-10 w-10 text-slate-300 mb-3" />
                  <p className="text-sm font-medium text-slate-600">No hay conversaciones</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {searchQuery ? 'No se encontraron resultados' : 'Los mensajes aparecerán aquí cuando tengas matches'}
                  </p>
                </div>
              ) : (
                filtered.map((conv) => {
                  const isActive = activeConv?.id === conv.id
                  const Icon = getOtherIcon(conv, usuario?.id)
                  const name = getOtherName(conv, usuario?.id)
                  const lastMsg = conv.mensajes?.[0]
                  const unread = conv.mensajes?.filter(m => !m.leido && m.id_usuario !== usuario?.id).length || 0

                  return (
                    <div
                      key={conv.id}
                      onClick={() => setActiveConv(conv)}
                      className={`
                        flex items-start gap-3 p-4 cursor-pointer border-b border-slate-100
                        hover:bg-slate-50 transition-colors
                        ${isActive ? 'bg-blue-50' : ''}
                      `}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-900 truncate">{name}</h4>
                          <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                            {lastMsg ? formatTime(lastMsg.fecha_envio) : ''}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 truncate mt-0.5">
                          {lastMsg ? lastMsg.contenido : 'Sin mensajes aún'}
                        </p>
                      </div>
                      {unread > 0 && (
                        <Badge variant="default" className="flex-shrink-0 ml-2">{unread}</Badge>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {activeConv ? (
              <>
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <OtherIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{otherName}</h3>
                    </div>
                  </div>
                </div>

                {/* Banner de reseña: aparece solo si hay match efectivo con el otro usuario */}
                {matchParaResena && (
                  <div className="px-4 pt-3 pb-1">
                    <div className={`rounded-lg border p-3 flex items-center justify-between ${
                      yaResenado
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-amber-50 border-amber-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Star className={`h-4 w-4 ${
                          yaResenado ? 'text-emerald-500' : 'text-amber-500'
                        }`} />
                        <p className={`text-sm font-medium ${
                          yaResenado ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {yaResenado
                            ? `Reseñaste a ${otherName} con ${yaResenado.raiting} estrellas`
                            : `Deja una reseña para ${otherName}`
                          }
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={yaResenado ? 'ghost' : 'default'}
                        className={yaResenado ? 'text-emerald-600' : ''}
                        onClick={() => yaResenado ? null : setShowResenaModal(true)}
                      >
                        {yaResenado ? 'Ver reseña' : 'Reseñar'}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {mensajes.length === 0 && !otherUserTyping && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageCircle className="h-8 w-8 text-slate-300 mb-2" />
                      <p className="text-sm text-slate-400">No hay mensajes aún</p>
                      <p className="text-xs text-slate-300 mt-1">Envía el primer mensaje</p>
                    </div>
                  )}
                  {mensajes.map((msg) => {
                    const isSent = msg.id_usuario === usuario?.id
                    return (
                      <div
                        key={msg.id_mensajes}
                        className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`
                            max-w-[70%] p-3 rounded-lg
                            ${isSent
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-slate-100 text-slate-900 rounded-bl-none'
                            }
                          `}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.contenido}</p>
                          <p className={`text-[10px] mt-1 ${isSent ? 'text-blue-200' : 'text-slate-400'}`}>
                            {formatMsgTime(msg.fecha_envio)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  {otherUserTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-lg rounded-bl-none p-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value)
                        handleTyping()
                      }}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button onClick={handleSend} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-slate-600">Selecciona una conversación</h3>
                  <p className="text-sm text-slate-400 mt-1">Elige un chat del panel izquierdo para empezar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de reseña */}
      <ResenaModal
        isOpen={showResenaModal}
        onClose={() => setShowResenaModal(false)}
        onSubmit={handleEnviarResena}
        targetName={otherName}
        loading={enviandoResena}
      />
    </div>
  )
}

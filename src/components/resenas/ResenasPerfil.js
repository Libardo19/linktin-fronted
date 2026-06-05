'use client'

import { useState, useEffect } from 'react'
import { Star, User, Building2, MessageCircle } from 'lucide-react'
import { resenaService } from '@/services/resena.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

/*
  ResenasPerfil:
  Componente que muestra las reseñas recibidas por un usuario.
  Props:
    idUsuario - ID del usuario del que se quieren ver las reseñas
    compact   - si es true, solo muestra el promedio (ideal para sidebar)
*/

export default function ResenasPerfil({ idUsuario, compact = false }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!idUsuario) return
    let cancelled = false
    resenaService.getRecibidas(idUsuario)
      .then((result) => { if (!cancelled) setData(result) })
      .catch(() => { if (!cancelled) setData(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [idUsuario])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!data || data.resenas?.length === 0) {
    if (compact) return null
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-400" />
            Reseñas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400 italic">Aún no hay reseñas</p>
        </CardContent>
      </Card>
    )
  }

  const { resenas, promedio, total } = data

  // Vista compacta: solo promedio (para sidebar o cards pequeñas)
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3.5 w-3.5 ${
                star <= Math.round(promedio || 0)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300'
              }`}
            />
          ))}
        </div>
        <span className="font-medium text-slate-700">{promedio ? promedio.toFixed(1) : '-'}</span>
        <span className="text-slate-400">({total})</span>
      </div>
    )
  }

  // Vista completa
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-400" />
            Reseñas
          </span>
          {promedio && (
            <span className="flex items-center gap-1 text-lg">
              <span className="text-amber-500 font-bold">{promedio.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(promedio)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-400 font-normal">({total})</span>
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resenas.length === 0 ? (
          <p className="text-sm text-slate-400 italic">Aún no hay reseñas</p>
        ) : (
          resenas.map((resena) => {
            // Determinar nombre y tipo del autor
            const esCandidato = resena.autor?.perfil_candidato
            const nombreAutor = esCandidato
              ? `${resena.autor.perfil_candidato.nombres} ${resena.autor.perfil_candidato.apellidos}`
              : resena.autor?.perfil_empresa?.nombre || 'Usuario'
            const IconoAutor = esCandidato ? User : Building2
            const fecha = new Date(resena.fecha_envio).toLocaleDateString('es-CO', {
              year: 'numeric', month: 'long', day: 'numeric',
            })

            return (
              <div key={resena.id_resena} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                <div className="flex items-start gap-3">
                  {/* Avatar del autor */}
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <IconoAutor className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {nombreAutor}
                      </p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{fecha}</span>
                    </div>
                    {/* Estrellas de la reseña */}
                    <div className="flex gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${
                            star <= resena.raiting
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    {/* Comentario */}
                    {resena.comentario && (
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {resena.comentario}
                      </p>
                    )}
                    {/* Match info */}
                    {resena.match && (
                      <p className="text-[10px] text-slate-400 mt-1">
                        Match #{resena.match.id_match}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

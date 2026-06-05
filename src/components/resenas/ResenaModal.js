'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Star } from 'lucide-react'

/*
  ResenaModal:
  Modal para crear una reseña con calificación de 1 a 5 estrellas y comentario opcional.
  Props:
    isOpen       - booleano que controla la visibilidad del modal
    onClose      - función que se ejecuta al cerrar el modal
    onSubmit     - función que recibe { raiting, comentario } al enviar
    targetName   - nombre de la persona/empresa a la que se reseña
    loading      - booleano para estado de carga
*/

export default function ResenaModal({ isOpen, onClose, onSubmit, targetName = '', loading = false }) {
  const [raiting, setRaiting] = useState(0)
  const [hover, setHover] = useState(0)
  const [comentario, setComentario] = useState('')
  const [error, setError] = useState('')

  // Reinicia el formulario al abrir/cerrar
  const handleClose = () => {
    setRaiting(0)
    setHover(0)
    setComentario('')
    setError('')
    onClose()
  }

  const handleSubmit = () => {
    if (raiting === 0) {
      setError('Debes seleccionar una calificación')
      return
    }
    setError('')
    onSubmit({ raiting, comentario: comentario.trim() })
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900">
            Reseñar a {targetName}
          </DialogTitle>
          <p className="text-sm text-slate-500 mt-1">
            ¿Qué tal fue tu experiencia con {targetName}?
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Selector de estrellas */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-slate-700">Calificación</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRaiting(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="p-0.5 transition-colors focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hover || raiting)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {raiting > 0 && (
              <span className="text-xs text-slate-500">
                {raiting === 1 ? 'Malo' : raiting === 2 ? 'Regular' : raiting === 3 ? 'Bueno' : raiting === 4 ? 'Muy bueno' : 'Excelente'}
              </span>
            )}
          </div>

          {/* Comentario opcional */}
          <div>
            <label htmlFor="comentario" className="block text-sm font-medium text-slate-700 mb-1">
              Comentario <span className="text-slate-400">(opcional)</span>
            </label>
            <Textarea
              id="comentario"
              placeholder="Cuenta tu experiencia..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              maxLength={1000}
            />
            <p className="text-xs text-slate-400 mt-1 text-right">{comentario.length}/1000</p>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar reseña'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

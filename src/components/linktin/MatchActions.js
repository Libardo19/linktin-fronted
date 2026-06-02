'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { X, Heart, RotateCcw, Star } from 'lucide-react'

export function MatchActions({
  onPass,
  onInterested,
  onUndo,
  onSuperLike,
  onHoverPass,
  onHoverInterested,
  disabled = false,
}) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {onUndo && (
        <button
          className="w-12 h-12 rounded-full border-2 border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onUndo}
          disabled={disabled}
        >
          <RotateCcw className="h-5 w-5 text-amber-500" />
        </button>
      )}

      <button
        className={cn(
          'w-16 h-16 rounded-full border-2 border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all duration-200 hover:scale-110 flex items-center justify-center',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={onPass}
        onMouseEnter={() => onHoverPass?.(true)}
        onMouseLeave={() => onHoverPass?.(false)}
        disabled={disabled}
      >
        <X className="h-7 w-7 text-red-500" />
      </button>

      {onSuperLike && (
        <button
          className="w-12 h-12 rounded-full border-2 border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSuperLike}
          disabled={disabled}
        >
          <Star className="h-5 w-5 text-blue-500" />
        </button>
      )}

      <button
        className={cn(
          'w-16 h-16 rounded-full border-2 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-200 hover:scale-110 flex items-center justify-center',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={onInterested}
        onMouseEnter={() => onHoverInterested?.(true)}
        onMouseLeave={() => onHoverInterested?.(false)}
        disabled={disabled}
      >
        <Heart className="h-7 w-7 text-emerald-500" />
      </button>
    </div>
  )
}

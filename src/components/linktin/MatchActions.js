'use client'

import { Button } from '../ui/Button'
import { X, Heart, Star } from 'lucide-react'

export function MatchActions({ 
  onPass, 
  onInterested, 
  onSuperApply,
  onHoverPass,
  onHoverInterested
}) {
  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      {/* Pass Button */}
      <button
        onClick={onPass}
        onMouseEnter={() => onHoverPass?.(true)}
        onMouseLeave={() => onHoverPass?.(false)}
        className="w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center
          text-slate-400 hover:text-red-500 hover:border-red-400 hover:bg-red-50
          transition-all duration-200 shadow-sm"
      >
        <X className="h-7 w-7" />
      </button>
      
      {/* Super Apply Button */}
      {onSuperApply && (
        <button
          onClick={onSuperApply}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center
            text-white hover:from-amber-500 hover:to-amber-600
            transition-all duration-200 shadow-lg shadow-amber-500/30"
        >
          <Star className="h-6 w-6" />
        </button>
      )}
      
      {/* Interested Button */}
      <button
        onClick={onInterested}
        onMouseEnter={() => onHoverInterested?.(true)}
        onMouseLeave={() => onHoverInterested?.(false)}
        className="w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center
          text-slate-400 hover:text-emerald-500 hover:border-emerald-400 hover:bg-emerald-50
          transition-all duration-200 shadow-sm"
      >
        <Heart className="h-7 w-7" />
      </button>
    </div>
  )
}
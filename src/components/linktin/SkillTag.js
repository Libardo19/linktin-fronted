'use client'

import { X, Plus, Check } from 'lucide-react'

export function SkillTag({ 
  skill, 
  endorsements = 0, 
  variant = 'default',
  onRemove,
  onAdd
}) {
  const isSuggested = variant === 'suggested'
  
  if (isSuggested) {
    return (
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
          border border-dashed border-slate-300 text-sm text-slate-600
          hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50
          transition-all duration-200"
      >
        <Plus className="h-3.5 w-3.5" />
        {skill}
      </button>
    )
  }
  
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-sm text-slate-700">
      {skill}
      {endorsements > 0 && (
        <span className="text-xs text-slate-500">{endorsements}</span>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}
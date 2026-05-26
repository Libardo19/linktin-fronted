'use client'

import { forwardRef } from 'react'

const Textarea = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <textarea
      className={`
        flex min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 
        text-sm text-slate-900 placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:cursor-not-allowed disabled:opacity-50
        transition-all duration-200 resize-none
        ${className}
      `}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }
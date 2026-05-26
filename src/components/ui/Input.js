'use client'

import { forwardRef } from 'react'

const Input = forwardRef(({ className = '', type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={`
        flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 
        text-sm text-slate-900 placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:cursor-not-allowed disabled:opacity-50
        transition-all duration-200
        ${className}
      `}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
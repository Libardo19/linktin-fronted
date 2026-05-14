'use client'

import { forwardRef } from 'react'

const variants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30',
  outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700',
}

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 text-sm',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10',
}

const Button = forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default',
  children,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium 
        transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
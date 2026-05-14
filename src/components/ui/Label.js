'use client'

export function Label({ className = '', children, ...props }) {
  return (
    <label 
      className={`text-sm font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
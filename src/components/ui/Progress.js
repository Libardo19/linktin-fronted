'use client'

export function Progress({ value = 0, className = '', ...props }) {
  return (
    <div 
      className={`relative h-2 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}
      {...props}
    >
      <div 
        className="h-full bg-blue-600 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
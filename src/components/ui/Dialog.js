'use client'

import { useEffect } from 'react'

export function Dialog({ open, onClose, className = '', children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div 
          className={`relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function DialogContent({ className = '', children, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function DialogHeader({ className = '', children, ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  )
}

export function DialogTitle({ className = '', children, ...props }) {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight text-slate-900 ${className}`} {...props}>
      {children}
    </h2>
  )
}

export function DialogDescription({ className = '', children, ...props }) {
  return (
    <p className={`text-sm text-slate-500 ${className}`} {...props}>
      {children}
    </p>
  )
}

export function DialogFooter({ className = '', children, ...props }) {
  return (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
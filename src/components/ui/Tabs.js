'use client'

import { createContext, useContext, useState } from 'react'

const TabsContext = createContext(null)

export function Tabs({ defaultValue, className = '', children, ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className = '', children, ...props }) {
  return (
    <div 
      className={`inline-flex h-10 items-center justify-center rounded-lg bg-slate-50 p-1 text-slate-500 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ value, className = '', children, ...props }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const isActive = activeTab === value
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md 
        px-3 py-1.5 text-sm font-medium transition-all
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        disabled:pointer-events-none disabled:opacity-50
        ${isActive 
          ? 'bg-white text-slate-900 shadow-sm' 
          : 'text-slate-500 hover:text-slate-700'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className = '', children, ...props }) {
  const { activeTab } = useContext(TabsContext)
  
  if (activeTab !== value) return null
  
  return (
    <div 
      className={`mt-2 focus-visible:outline-none ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
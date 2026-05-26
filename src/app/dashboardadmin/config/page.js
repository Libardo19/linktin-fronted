'use client'

import { useState } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Save, RefreshCw, Settings } from 'lucide-react'

const configSections = [
  {
    title: 'Plataforma',
    description: 'Configuración general del sitio',
    fields: [
      { label: 'Nombre del sitio', value: 'LinkTin' },
      { label: 'URL del backend', value: 'http://localhost:3001' },
      { label: 'Modo mantenimiento', value: 'false', type: 'select', options: ['true', 'false'] },
    ],
  },
  {
    title: 'Correo y Notificaciones',
    description: 'Configuración del servidor de correo',
    fields: [
      { label: 'SMTP Host', value: 'smtp.linktin.com' },
      { label: 'Puerto SMTP', value: '587' },
      { label: 'Notificaciones push', value: 'Activadas', type: 'select', options: ['Activadas', 'Desactivadas'] },
    ],
  },
  {
    title: 'Límites del sistema',
    description: 'Restricciones y límites de la plataforma',
    fields: [
      { label: 'Máximo de ofertas por empresa', value: '50' },
      { label: 'Máximo de matches por día', value: '100' },
      { label: 'Tiempo de inactividad (días)', value: '90' },
    ],
  },
]

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="config" notificationCount={0} type="admin" />

      <main className="max-w-[800px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Configuración</h1>
            <p className="text-sm text-slate-500">Configuración del sistema</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Restaurar
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-1" />
              Guardar
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {configSections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5 text-slate-400" />
                  {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.label}>
                    <Label className="text-sm font-medium text-slate-700">{field.label}</Label>
                    {field.type === 'select' ? (
                      <select
                        defaultValue={field.value}
                        className="mt-1 flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <Input defaultValue={field.value} className="mt-1" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

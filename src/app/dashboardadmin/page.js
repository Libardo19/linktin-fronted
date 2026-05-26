'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Users, Building2, Heart, Briefcase, AlertTriangle, Clock } from 'lucide-react'
import { adminService } from '@/services/admin.service'

export default function DashboardAdminPage() {
  const [stats, setStats] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [reportesStats, setReportesStats] = useState(null)
  const [cargandoReportes, setCargandoReportes] = useState(true)

  useEffect(() => {
    const cargarStats = async () => {
      try {
        const data = await adminService.getStats()
        setStats(data)
      } catch (err) {
        setError("Error al cargar estadísticas")
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarStats()
  }, [])

  useEffect(() => {
    const cargarReportesStats = async () => {
      try {
        const data = await adminService.getDashboardReportes()
        setReportesStats(data)
      } catch (err) {
        console.error(err)
      } finally {
        setCargandoReportes(false)
      }
    }
    cargarReportesStats()
  }, [])

  const statsCards = stats ? [
    {
      title: 'Total Candidatos',
      value: stats.totalCandidatos?.toLocaleString() || '0',
      description: 'candidatos registrados',
      icon: Users,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Empresas',
      value: stats.totalEmpresas?.toLocaleString() || '0',
      description: 'empresas registradas',
      icon: Building2,
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Matches Exitosos',
      value: stats.matchesExitosos?.toLocaleString() || '0',
      description: 'matches aceptados',
      icon: Heart,
      bgColor: 'bg-rose-100',
      iconColor: 'text-rose-600',
    },
    {
      title: 'Ofertas Activas',
      value: stats.ofertasActivas?.toLocaleString() || '0',
      description: 'ofertas publicadas',
      icon: Briefcase,
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
  ] : []

  const actividadReciente = stats?.actividadReciente?.map((u) => ({
    id: u.id_usuarios,
    message: `${u.tipo === 'empresa' ? 'Empresa' : u.tipo === 'candidato' ? 'Candidato' : 'Admin'} registrado: ${u.email}`,
    time: new Date(u.fecha_creacion).toLocaleDateString('es-CO'),
  })) || []

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="dashboard" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Resumen general de la plataforma</p>
          </div>
        </div>

        {cargando ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : error ? (
          <Card className="p-6 text-center">
            <p className="text-red-500">{error}</p>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {statsCards.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </CardTitle>
                      <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                        <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-slate-400" />
                    Actividad Reciente
                  </CardTitle>
                  <CardDescription>Últimos registros en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  {actividadReciente.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-4">Sin actividad reciente</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {actividadReciente.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                        >
                          <span className="text-sm text-slate-900">{activity.message}</span>
                          <span className="text-xs text-slate-400 shrink-0 ml-4">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Reportes Pendientes
                    </CardTitle>
                    <Link href="/dashboardadmin/reportes">
                      <Button variant="ghost" size="sm">Ver todos</Button>
                    </Link>
                  </div>
                  <CardDescription>Requieren atención</CardDescription>
                </CardHeader>
                <CardContent>
                  {cargandoReportes ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
                    </div>
                  ) : reportesStats ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Pendientes</span>
                        <span className="text-2xl font-bold text-amber-600">{reportesStats.pendiente}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">En revisión</span>
                        <span className="text-2xl font-bold text-blue-600">{reportesStats.en_revision}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-sm text-slate-600">Resueltos</span>
                        <span className="text-lg font-semibold text-emerald-600">{reportesStats.resuelto}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Descartados</span>
                        <span className="text-lg font-semibold text-slate-500">{reportesStats.descartado}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 text-center py-4">Sin datos</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

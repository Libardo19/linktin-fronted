'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Users, Building2, Heart, Briefcase, TrendingUp, TrendingDown, AlertTriangle, Clock, Activity } from 'lucide-react'
import { adminService } from '@/services/admin.service'

export default function DashboardAdminPage() {
  const [stats, setStats] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

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

  const statsCards = stats ? [
    {
      title: 'Total Candidatos',
      value: stats.totalCandidatos?.toLocaleString() || '0',
      change: '+12.5%',
      trend: 'up',
      description: 'candidatos registrados',
      icon: Users,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Empresas',
      value: stats.totalEmpresas?.toLocaleString() || '0',
      change: '+8.2%',
      trend: 'up',
      description: 'empresas registradas',
      icon: Building2,
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Matches Exitosos',
      value: stats.matchesExitosos?.toLocaleString() || '0',
      change: '+23.1%',
      trend: 'up',
      description: 'matches aceptados',
      icon: Heart,
      bgColor: 'bg-rose-100',
      iconColor: 'text-rose-600',
    },
    {
      title: 'Ofertas Activas',
      value: stats.ofertasActivas?.toLocaleString() || '0',
      change: '-3.2%',
      trend: 'down',
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
                const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
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
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <TrendIcon
                          className={`h-3 w-3 ${
                            stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                          }`}
                        />
                        <span
                          className={
                            stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                          }
                        >
                          {stat.change}
                        </span>
                        <span className="text-slate-400">{stat.description}</span>
                      </div>
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Reportes Pendientes
                  </CardTitle>
                  <CardDescription>Requieren atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 text-center py-4">
                    Módulo de reportes próximamente
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

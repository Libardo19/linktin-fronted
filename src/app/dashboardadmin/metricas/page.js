'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { BarChart3, TrendingUp, Users, Building2, Briefcase, Activity } from 'lucide-react'
import { adminService } from '@/services/admin.service'

export default function MetricasPage() {
  const [metricas, setMetricas] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarMetricas = async () => {
      try {
        const data = await adminService.getMetricas()
        setMetricas(data)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarMetricas()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="metricas" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Métricas y Analíticas</h1>
          <p className="text-sm text-slate-500">Estadísticas detalladas de la plataforma</p>
        </div>

        {cargando ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : metricas ? (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-slate-500">Candidatos activos</p>
                    <div className="rounded-lg p-2 bg-blue-100">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{metricas.candidatosActivos}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{metricas.candidatosActivos}/{metricas.totalCandidatos}</span>
                      <span>{metricas.totalCandidatos > 0 ? Math.round((metricas.candidatosActivos / metricas.totalCandidatos) * 100) : 0}%</span>
                    </div>
                    <Progress value={metricas.totalCandidatos > 0 ? Math.round((metricas.candidatosActivos / metricas.totalCandidatos) * 100) : 0} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-slate-500">Empresas activas</p>
                    <div className="rounded-lg p-2 bg-indigo-100">
                      <Building2 className="h-4 w-4 text-indigo-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{metricas.empresasActivas}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{metricas.empresasActivas}/{metricas.totalEmpresas}</span>
                      <span>{metricas.totalEmpresas > 0 ? Math.round((metricas.empresasActivas / metricas.totalEmpresas) * 100) : 0}%</span>
                    </div>
                    <Progress value={metricas.totalEmpresas > 0 ? Math.round((metricas.empresasActivas / metricas.totalEmpresas) * 100) : 0} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-slate-500">Tasa de match</p>
                    <div className="rounded-lg p-2 bg-rose-100">
                      <Activity className="h-4 w-4 text-rose-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{metricas.tasaMatch}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-slate-500">Ofertas activas</p>
                    <div className="rounded-lg p-2 bg-amber-100">
                      <Briefcase className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{metricas.porcentajeOfertasActivas}%</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Resumen General
                  </CardTitle>
                  <CardDescription>Totales de la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Total Candidatos</span>
                      <span className="text-sm font-semibold text-slate-900">{metricas.totalCandidatos}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Total Empresas</span>
                      <span className="text-sm font-semibold text-slate-900">{metricas.totalEmpresas}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Total Matches</span>
                      <span className="text-sm font-semibold text-slate-900">{metricas.totalMatches}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Total Ofertas</span>
                      <span className="text-sm font-semibold text-slate-900">{metricas.totalOfertas}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-slate-600">Total Habilidades</span>
                      <span className="text-sm font-semibold text-slate-900">{metricas.totalHabilidades}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Habilidades más usadas
                  </CardTitle>
                  <CardDescription>Top 5 habilidades en la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {metricas.topSkills?.length > 0 ? (
                    metricas.topSkills.map((skill, i) => (
                      <div key={skill.nombre}>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-medium text-slate-400 w-5">{i + 1}</span>
                          <div className="flex-1 flex justify-between">
                            <span className="text-sm text-slate-900">{skill.nombre}</span>
                            <span className="text-sm text-slate-500">{skill.totalUsos}</span>
                          </div>
                        </div>
                        <Progress value={skill.porcentaje} className="h-1.5 ml-8" />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 text-center py-4">Sin datos de habilidades</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-slate-500">Error al cargar métricas</p>
          </Card>
        )}
      </main>
    </div>
  )
}

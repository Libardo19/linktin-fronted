'use client'

import { useState, useEffect, useCallback } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog'
import {
  Flag, AlertTriangle, CheckCircle, XCircle, Clock,
  Eye, User, Building2, MessageSquare, Star,
  ChevronLeft, ChevronRight, FileText, RefreshCw
} from 'lucide-react'
import { adminService } from '@/services/admin.service'

const ESTADOS_MAP = {
  pendiente: 'Pendiente',
  en_revision: 'En revisión',
  resuelto: 'Resuelto',
  descartado: 'Descartado',
}

const TIPOS_ENTIDAD_MAP = {
  usuario: 'Usuario',
  oferta: 'Oferta',
  resena: 'Reseña',
}

const MOTIVOS_MAP = {
  abuso: 'Abuso',
  acoso: 'Acoso',
  spam: 'Spam',
  contenido_inapropiado: 'Contenido inapropiado',
  lenguaje_ofensivo: 'Lenguaje ofensivo',
  oferta_falsa: 'Oferta falsa',
  informacion_incorrecta: 'Información incorrecta',
  suplantacion: 'Suplantación',
  otro: 'Otro',
}

const getEstadoVariant = (estado) => {
  const map = {
    pendiente: 'warning',
    en_revision: 'default',
    resuelto: 'success',
    descartado: 'secondary',
  }
  return map[estado] || 'secondary'
}

const getNombreUsuario = (u) => {
  if (!u) return '-'
  if (u.perfil_candidato) return `${u.perfil_candidato.nombres} ${u.perfil_candidato.apellidos}`
  if (u.perfil_empresa) return u.perfil_empresa.nombre
  return u.email
}

const estadosOptions = Object.entries(ESTADOS_MAP)
const tiposEntidadOptions = Object.entries(TIPOS_ENTIDAD_MAP)
const motivosOptions = Object.entries(MOTIVOS_MAP)

export default function ReportesPage() {
  const [reportes, setReportes] = useState([])
  const [dashboardCounts, setDashboardCounts] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [cargandoCounts, setCargandoCounts] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({ estado: '', tipo_entidad: '', motivo: '' })
  const [selectedReporte, setSelectedReporte] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [nuevoEstado, setNuevoEstado] = useState('')
  const [nuevaNota, setNuevaNota] = useState('')
  const [gestionando, setGestionando] = useState(false)

  const cargarReportes = useCallback(async () => {
    setCargando(true)
    try {
      const params = { page, limit: 20 }
      if (filters.estado) params.estado = filters.estado
      if (filters.tipo_entidad) params.tipo_entidad = filters.tipo_entidad
      if (filters.motivo) params.motivo = filters.motivo

      const result = await adminService.getReportes(params)
      setReportes(result.items)
      setTotalPages(result.totalPages)
      setTotal(result.total)
    } catch (err) {
      console.error(err)
      setReportes([])
    } finally {
      setCargando(false)
    }
  }, [page, filters])

  const cargarDashboard = useCallback(async () => {
    setCargandoCounts(true)
    try {
      const data = await adminService.getDashboardReportes()
      setDashboardCounts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setCargandoCounts(false)
    }
  }, [])

  useEffect(() => { cargarReportes() }, [cargarReportes])
  useEffect(() => { cargarDashboard() }, [cargarDashboard])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const abrirDialogo = (reporte) => {
    setSelectedReporte(reporte)
    setNuevoEstado(reporte.estado)
    setNuevaNota(reporte.nota_admin || '')
    setDialogOpen(true)
  }

  const cerrarDialogo = () => {
    setDialogOpen(false)
    setSelectedReporte(null)
    setNuevoEstado('')
    setNuevaNota('')
  }

  const handleGestionar = async () => {
    if (!selectedReporte || !nuevoEstado) return
    setGestionando(true)
    try {
      await adminService.gestionarReporte(selectedReporte.id_reporte, {
        estado: nuevoEstado,
        ...(nuevaNota !== undefined && { nota_admin: nuevaNota || undefined }),
      })
      cerrarDialogo()
      await Promise.all([cargarReportes(), cargarDashboard()])
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al gestionar el reporte'
      alert(msg)
    } finally {
      setGestionando(false)
    }
  }

  const esEstadoTerminal = (estado) => estado === 'resuelto' || estado === 'descartado'

  const StatsCard = ({ label, count, icon: Icon, color, bgColor, badgeColor }) => (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`rounded-lg p-2.5 ${bgColor}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className={`text-xl font-bold ${badgeColor || 'text-slate-900'}`}>
            {cargandoCounts ? '-' : count ?? 0}
          </p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="reportes" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>
            <p className="text-sm text-slate-500">Moderación de reportes de la plataforma</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { cargarReportes(); cargarDashboard() }}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Actualizar
          </Button>
        </div>

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 mb-6">
          <StatsCard
            label="Pendientes"
            count={dashboardCounts?.pendiente}
            icon={Clock}
            color="text-amber-600"
            bgColor="bg-amber-100"
            badgeColor="text-amber-600"
          />
          <StatsCard
            label="En revisión"
            count={dashboardCounts?.en_revision}
            icon={Eye}
            color="text-blue-600"
            bgColor="bg-blue-100"
            badgeColor="text-blue-600"
          />
          <StatsCard
            label="Resueltos"
            count={dashboardCounts?.resuelto}
            icon={CheckCircle}
            color="text-emerald-600"
            bgColor="bg-emerald-100"
            badgeColor="text-emerald-600"
          />
          <StatsCard
            label="Descartados"
            count={dashboardCounts?.descartado}
            icon={XCircle}
            color="text-slate-500"
            bgColor="bg-slate-100"
            badgeColor="text-slate-500"
          />
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-500">Filtros:</span>
              </div>

              <select
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.estado}
                onChange={(e) => handleFilterChange('estado', e.target.value)}
              >
                <option value="">Todos los estados</option>
                {estadosOptions.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>

              <select
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.tipo_entidad}
                onChange={(e) => handleFilterChange('tipo_entidad', e.target.value)}
              >
                <option value="">Todos los tipos</option>
                {tiposEntidadOptions.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>

              <select
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.motivo}
                onChange={(e) => handleFilterChange('motivo', e.target.value)}
              >
                <option value="">Todos los motivos</option>
                {motivosOptions.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>

              {(filters.estado || filters.tipo_entidad || filters.motivo) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setFilters({ estado: '', tipo_entidad: '', motivo: '' }); setPage(1) }}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {cargando ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : reportes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <Flag className="h-10 w-10 mb-3" />
                <p className="text-sm font-medium">No hay reportes</p>
                <p className="text-xs mt-1">
                  {filters.estado || filters.tipo_entidad || filters.motivo
                    ? 'No se encontraron reportes con los filtros actuales'
                    : 'No se han recibido reportes aún'}
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left text-xs font-medium text-slate-500 py-3 px-4 w-16">#</th>
                        <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Reportante</th>
                        <th className="text-left text-xs font-medium text-slate-500 py-3 px-4 w-24">Tipo</th>
                        <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Motivo</th>
                        <th className="text-left text-xs font-medium text-slate-500 py-3 px-4 w-28">Estado</th>
                        <th className="text-left text-xs font-medium text-slate-500 py-3 px-4 w-28">Fecha</th>
                        <th className="text-right text-xs font-medium text-slate-500 py-3 px-4 w-20">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportes.map((r) => (
                        <tr key={r.id_reporte} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm text-slate-500 font-mono">#{r.id_reporte}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <User className="h-3.5 w-3.5 text-slate-500" />
                              </div>
                              <span className="text-sm font-medium text-slate-900 truncate max-w-[180px]">
                                {getNombreUsuario(r.reportante)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="text-xs capitalize">
                              {TIPOS_ENTIDAD_MAP[r.tipo_entidad] || r.tipo_entidad}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600 truncate max-w-[200px]">
                            {MOTIVOS_MAP[r.motivo] || r.motivo}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={getEstadoVariant(r.estado)} className="text-xs">
                              {ESTADOS_MAP[r.estado] || r.estado}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-500">
                            {new Date(r.fecha_creacion).toLocaleDateString('es-CO')}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm" title="Ver detalle" onClick={() => abrirDialogo(r)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    {total} reporte{total !== 1 ? 's' : ''} — Página {page} de {totalPages}
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage(p => p - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
                      onClick={() => setPage(p => p + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={dialogOpen} onClose={cerrarDialogo}>
        {selectedReporte && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Reporte #{selectedReporte.id_reporte}</DialogTitle>
                <Badge variant={getEstadoVariant(selectedReporte.estado)} className="text-xs">
                  {ESTADOS_MAP[selectedReporte.estado] || selectedReporte.estado}
                </Badge>
              </div>
              <DialogDescription>
                {new Date(selectedReporte.fecha_creacion).toLocaleDateString('es-CO', {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700">Motivo:</span>
                  <span className="text-slate-900">{MOTIVOS_MAP[selectedReporte.motivo] || selectedReporte.motivo}</span>
                </div>
                {selectedReporte.comentario && (
                  <div className="flex items-start gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-slate-600">{selectedReporte.comentario}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Reportante</h4>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="font-medium text-slate-900">{getNombreUsuario(selectedReporte.reportante)}</span>
                  <Badge variant="outline" className="text-xs capitalize">{selectedReporte.reportante?.tipo}</Badge>
                </div>
                <p className="text-sm text-slate-500 ml-6">{selectedReporte.reportante?.email}</p>
              </div>

              {selectedReporte.tipo_entidad === 'usuario' && selectedReporte.usuario_reportado && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Usuario Reportado</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-red-400" />
                    <span className="font-medium text-slate-900">{getNombreUsuario(selectedReporte.usuario_reportado)}</span>
                    <Badge variant="outline" className="text-xs capitalize">{selectedReporte.usuario_reportado.tipo}</Badge>
                  </div>
                  <p className="text-sm text-slate-500 ml-6">{selectedReporte.usuario_reportado.email}</p>
                </div>
              )}

              {selectedReporte.tipo_entidad === 'oferta' && selectedReporte.oferta_reportada && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Oferta Reportada</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-amber-400" />
                    <span className="font-medium text-slate-900">{selectedReporte.oferta_reportada.titulo}</span>
                  </div>
                  <p className="text-sm text-slate-500 ml-6">
                    {selectedReporte.oferta_reportada.perfil_empresa?.nombre} — {selectedReporte.oferta_reportada.estado}
                  </p>
                </div>
              )}

              {selectedReporte.tipo_entidad === 'resena' && selectedReporte.resena_reportada && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Reseña Reportada</h4>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-slate-900">{'★'.repeat(selectedReporte.resena_reportada.raiting)}{'☆'.repeat(5 - selectedReporte.resena_reportada.raiting)}</span>
                    <span className="text-xs text-slate-400">({selectedReporte.resena_reportada.raiting}/5)</span>
                  </div>
                  <p className="text-sm text-slate-600 ml-6 mb-1">{selectedReporte.resena_reportada.comentario}</p>
                  <p className="text-xs text-slate-400 ml-6">
                    Por: {getNombreUsuario(selectedReporte.resena_reportada.autor)}
                  </p>
                </div>
              )}

              {selectedReporte.nota_admin && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nota del Admin</h4>
                  <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">{selectedReporte.nota_admin}</p>
                </div>
              )}

              {!esEstadoTerminal(selectedReporte.estado) && (
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Gestionar Reporte</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nuevo estado</label>
                      <select
                        className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={nuevoEstado}
                        onChange={(e) => setNuevoEstado(e.target.value)}
                      >
                        {estadosOptions.map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Nota para el admin {selectedReporte.nota_admin ? '(dejar vacío para mantener la actual)' : '(opcional)'}
                      </label>
                      <Textarea
                        placeholder="Añade una nota interna sobre la resolución..."
                        value={nuevaNota}
                        onChange={(e) => setNuevaNota(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {esEstadoTerminal(selectedReporte.estado) && (
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 rounded-lg p-3">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Este reporte ya fue {ESTADOS_MAP[selectedReporte.estado]} y no puede modificarse.</span>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={cerrarDialogo}>
                Cerrar
              </Button>
              {!esEstadoTerminal(selectedReporte.estado) && (
                <Button onClick={handleGestionar} disabled={gestionando || !nuevoEstado}>
                  {gestionando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar cambios'
                  )}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

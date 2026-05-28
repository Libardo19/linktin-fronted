'use client'

import { useState, useEffect } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Heart, Users, Building2, CheckCircle, XCircle } from 'lucide-react'
import { adminService } from '@/services/admin.service'

export default function MatchesPage() {
  const [matches, setMatches] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarMatches = async () => {
      try {
        const data = await adminService.getMatches()
        setMatches(data)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarMatches()
  }, [])

  const getEstadoGeneral = (m) => {
    if (m.estadoUsuario === 'aceptado' && m.estadoEmpresa === 'aceptado') return 'aceptado'
    if (m.estadoUsuario === 'rechazado' || m.estadoEmpresa === 'rechazado') return 'rechazado'
    return 'pendiente'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="matches" notificationCount={0} type="admin" />

      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Matches Realizados</h1>
          <p className="text-sm text-slate-500">Historial de matches entre candidatos y empresas</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {cargando ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Candidato</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Empresa</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Cargo</th>
                    <th className="text-center text-xs font-medium text-slate-500 py-3 px-4">Match %</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Estado</th>
                    <th className="text-left text-xs font-medium text-slate-500 py-3 px-4">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m) => {
                    const estado = getEstadoGeneral(m)
                    const nombreCandidato = m.usuario?.perfil_candidato
                      ? `${m.usuario.perfil_candidato.nombres} ${m.usuario.perfil_candidato.apellidos}`
                      : m.usuario?.id_usuarios || 'Desconocido'

                    return (
                      <tr key={m.id_match} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-900">{nombreCandidato}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                              <Building2 className="h-4 w-4 text-indigo-600" />
                            </div>
                            <span className="text-sm text-slate-600">{m.oferta?.perfil_empresa?.nombre || '-'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">{m.oferta?.titulo || '-'}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-sm font-semibold ${
                            Number(m.compatibilidad) >= 90 ? 'text-emerald-600' : Number(m.compatibilidad) >= 80 ? 'text-blue-600' : 'text-amber-600'
                          }`}>
                            {Number(m.compatibilidad)}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={estado === 'aceptado' ? 'success' : estado === 'pendiente' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {estado === 'aceptado' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {estado === 'rechazado' && <XCircle className="h-3 w-3 mr-1" />}
                            {estado}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">
                          {new Date(m.fechaMatch).toLocaleDateString('es-CO')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

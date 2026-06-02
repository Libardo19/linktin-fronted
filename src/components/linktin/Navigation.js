'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Briefcase,
  Heart,
  Bell,
  MessageCircle,
  User,
  Building2,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Shield,
  Flag,
  Users,
  BarChart3,
  Settings,
  Tags,
} from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { useAuth } from '../../context/AuthContext'
import { cn } from '@/lib/utils'

const candidateNavItems = [
  { href: '/dashboardcandidato', icon: Home, label: 'Home', active: 'home' },
  { href: '/dashboardcandidato/matches', icon: Heart, label: 'Matches', active: 'match' },
  { href: '/dashboardcandidato/mensajes', icon: MessageCircle, label: 'Messages', active: 'messages' },
  { href: '/dashboardcandidato/notificaciones', icon: Bell, label: 'Notifications', active: 'notifications' },
  { href: '/dashboardcandidato/perfil', icon: User, label: 'Profile', active: 'profile' },
]

const empresaNavItems = [
  { href: '/dashboardempresa', icon: Building2, label: 'Home', active: 'home' },
  { href: '/dashboardempresa/matches', icon: Heart, label: 'Matches', active: 'match' },
  { href: '/dashboardempresa/ofertas', icon: Briefcase, label: 'Ofertas', active: 'jobs' },
  { href: '/dashboardempresa/notificaciones', icon: Bell, label: 'Notificaciones', active: 'notifications' },
  { href: '/dashboardempresa/perfil', icon: User, label: 'Perfil', active: 'profile' },
]

const adminNavItems = [
  { href: '/dashboardadmin', icon: LayoutDashboard, label: 'Dashboard', active: 'dashboard' },
  { href: '/dashboardadmin/candidatos', icon: Users, label: 'Candidatos', active: 'candidatos' },
  { href: '/dashboardadmin/empresas', icon: Building2, label: 'Empresas', active: 'empresas' },
  { href: '/dashboardadmin/ofertas', icon: Briefcase, label: 'Ofertas', active: 'ofertas' },
  { href: '/dashboardadmin/matches', icon: Heart, label: 'Matches', active: 'matches' },
  { href: '/dashboardadmin/reportes', icon: Flag, label: 'Reportes', active: 'reportes' },
  { href: '/dashboardadmin/catalogo', icon: Tags, label: 'Catálogo', active: 'catalogo' },
  { href: '/dashboardadmin/metricas', icon: BarChart3, label: 'Métricas', active: 'metricas' },
  { href: '/dashboardadmin/usuarios', icon: Shield, label: 'Usuarios', active: 'usuarios' },
  { href: '/dashboardadmin/config', icon: Settings, label: 'Config', active: 'config' },
]

export function GlobalNavigation({ activeTab = 'home', notificationCount = 0, type = 'candidato' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { logout, usuario } = useAuth()

  const navItems = type === 'empresa' ? empresaNavItems : type === 'admin' ? adminNavItems : candidateNavItems

  const handleLogout = () => {
    logout()
  }

  const linkClass = (isActive) =>
    cn(
      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
      isActive
        ? 'bg-blue-500/10 text-blue-600'
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
    )

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href={type === 'empresa' ? '/dashboardempresa' : type === 'admin' ? '/dashboardadmin' : '/dashboardcandidato'}
              className="flex items-center gap-2 no-underline"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg text-slate-900">
                Link<span className="text-blue-600">Tin</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.active
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={linkClass(isActive)}
                  >
                    <Icon className={cn('h-4 w-4', isActive && 'text-blue-600')} />
                    <span>{item.label}</span>
                    {item.active === 'notifications' && notificationCount > 0 && (
                      <Badge className="ml-1 h-5 min-w-5 px-1" variant="destructive">
                        {notificationCount}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar fallback={usuario?.email ? usuario.email[0].toUpperCase() : 'U'} className="h-8 w-8" />
                <span className="hidden lg:block text-sm font-medium text-slate-600">
                  {usuario?.email || 'Usuario'}
                </span>
              </div>
              <button
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                onClick={handleLogout}
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>

              <button
                className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 md:hidden">
          <div className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.active
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.active === 'notifications' && notificationCount > 0 && (
                    <Badge variant="destructive" className="ml-auto">{notificationCount}</Badge>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

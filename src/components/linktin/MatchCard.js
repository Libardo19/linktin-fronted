'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import {
  MapPin,
  Building2,
  BadgeCheck,
  Banknote,
  Laptop,
  TrendingUp,
} from 'lucide-react'

export function MatchCard({
  companyName = 'Empresa',
  isVerified = false,
  jobTitle = 'Oferta',
  location = 'No especificada',
  locationType = 'No especificada',
  salaryRange = 'A convenir',
  matchPercentage = 85,
  description = '',
  requiredSkills = [],
  matchingSkills = [],
  swipeDirection = null,
  isTopCard = true,
}) {
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return '#10b981'
    if (percentage >= 60) return '#f59e0b'
    return '#64748b'
  }

  const getMatchBg = (percentage) => {
    if (percentage >= 80) return 'bg-emerald-500/10'
    if (percentage >= 60) return 'bg-amber-500/10'
    return 'bg-muted'
  }

  return (
    <div
      className={cn(
        'relative w-full h-full rounded-2xl bg-white border border-slate-200/50 overflow-hidden transition-all duration-300',
        isTopCard ? 'shadow-xl shadow-blue-500/5' : 'shadow-lg shadow-blue-500/5 opacity-60 scale-[0.97]',
        swipeDirection === 'left' && 'animate-swipe-left',
        swipeDirection === 'right' && 'animate-swipe-right'
      )}
    >
      <div className={cn(
        'absolute inset-0 bg-red-500/10 z-10 transition-opacity duration-200 pointer-events-none rounded-2xl',
        swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
      )}>
        <div className="absolute top-8 left-8 -rotate-[15deg]">
          <span className="text-3xl font-black text-red-500 border-4 border-red-500 rounded-lg px-4 py-2">
            PASO
          </span>
        </div>
      </div>

      <div className={cn(
        'absolute inset-0 bg-emerald-500/10 z-10 transition-opacity duration-200 pointer-events-none rounded-2xl',
        swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
      )}>
        <div className="absolute top-8 right-8 rotate-[15deg]">
          <span className="text-3xl font-black text-emerald-500 border-4 border-emerald-500 rounded-lg px-4 py-2">
            ME INTERESA
          </span>
        </div>
      </div>

      <div className="relative h-full flex flex-col p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center ring-2 ring-slate-200">
              <Building2 className="h-7 w-7 text-slate-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-slate-900">{companyName}</h3>
                {isVerified && (
                  <BadgeCheck className="h-4 w-4 text-blue-600 fill-blue-100" />
                )}
              </div>
              <p className="text-sm text-slate-500">Empresa verificada</p>
            </div>
          </div>

          <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full', getMatchBg(matchPercentage))}>
            <TrendingUp className="h-4 w-4" style={{ color: getMatchColor(matchPercentage) }} />
            <span className="text-sm font-bold" style={{ color: getMatchColor(matchPercentage) }}>
              {matchPercentage}%
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-3 text-pretty leading-tight">
          {jobTitle}
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="gap-1.5 py-1 px-2.5">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </Badge>
          <Badge variant="secondary" className="gap-1.5 py-1 px-2.5">
            <Laptop className="h-3.5 w-3.5" />
            {locationType}
          </Badge>
          <Badge variant="secondary" className="gap-1.5 py-1 px-2.5">
            <Banknote className="h-3.5 w-3.5" />
            {salaryRange}
          </Badge>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-shrink-0">
          {description}
        </p>

        <div className="mt-auto">
          <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
            Habilidades requeridas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {requiredSkills.slice(0, 6).map((skill, index) => (
              <Badge
                key={index}
                variant={matchingSkills.includes(skill) ? 'default' : 'outline'}
                className={cn(
                  'text-xs py-0.5',
                  matchingSkills.includes(skill) && 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                )}
              >
                {skill}
              </Badge>
            ))}
            {requiredSkills.length > 6 && (
              <Badge variant="outline" className="text-xs py-0.5">
                +{requiredSkills.length - 6}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  )
}

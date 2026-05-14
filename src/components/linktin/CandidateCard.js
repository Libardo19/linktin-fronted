'use client'

import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { MapPin, GraduationCap } from 'lucide-react'

export function CandidateCard({
  name = 'Candidate Name',
  title = 'Job Title',
  university = 'University',
  location = 'Location',
  matchPercentage = 0,
  skills = [],
  swipeDirection = null,
  isTopCard = true,
  onClick
}) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  
  const cardStyle = isTopCard ? {
    transform: swipeDirection === 'left' ? 'translateX(-100%) rotate(-10deg)' : 
               swipeDirection === 'right' ? 'translateX(100%) rotate(10deg)' : 
               'translateX(0) rotate(0)',
    transition: 'transform 0.3s ease-out'
  } : {}

  return (
    <div 
      className="w-full h-full cursor-pointer"
      style={cardStyle}
      onClick={onClick}
    >
      <Card className="w-full h-full overflow-hidden shadow-lg">
        <CardContent className="p-5 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">{initials}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{name}</h3>
                <p className="text-sm text-slate-600">{title}</p>
              </div>
            </div>
            
            {/* Match Percentage */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${matchPercentage >= 80 ? 'bg-emerald-100' : matchPercentage >= 60 ? 'bg-amber-100' : 'bg-slate-100'}
            `}>
              <span className={`
                text-sm font-bold
                ${matchPercentage >= 80 ? 'text-emerald-600' : matchPercentage >= 60 ? 'text-amber-600' : 'text-slate-600'}
              `}>
                {matchPercentage}%
              </span>
            </div>
          </div>
          
          {/* Location & University */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {university}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
          </div>
          
          {/* Skills */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
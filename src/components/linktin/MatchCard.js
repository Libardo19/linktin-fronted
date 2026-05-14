'use client'

import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Building2, MapPin, DollarSign, CheckCircle2 } from 'lucide-react'

export function MatchCard({
  companyName = 'Company',
  isVerified = false,
  jobTitle = 'Job Title',
  location = 'Location',
  locationType = 'Remote',
  salaryRange = '$0 - $0',
  matchPercentage = 0,
  description = '',
  requiredSkills = [],
  matchingSkills = [],
  swipeDirection = null,
  isTopCard = true,
  onClick
}) {
  const cardStyle = isTopCard ? {
    transform: swipeDirection === 'left' ? 'translateX(-100%) rotate(-10deg)' : 
               swipeDirection === 'right' ? 'translateX(100%) rotate(10deg)' : 
               'translateX(0) rotate(0)',
    opacity: 1,
    transition: 'transform 0.3s ease-out'
  } : {}

  return (
    <div 
      className="w-full h-full cursor-pointer"
      style={cardStyle}
      onClick={onClick}
    >
      <Card className="w-full h-full overflow-hidden shadow-lg">
        {/* Header with company info */}
        <div className="p-5 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{companyName}</h3>
                  {isVerified && (
                    <Badge variant="success" className="text-[10px] py-0">Verified</Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600">{jobTitle}</p>
              </div>
            </div>
            
            {/* Match Percentage */}
            <div className="flex flex-col items-center">
              <div className={`
                w-14 h-14 rounded-full flex items-center justify-center
                ${matchPercentage >= 80 ? 'bg-emerald-100' : matchPercentage >= 60 ? 'bg-amber-100' : 'bg-slate-100'}
              `}>
                <span className={`
                  text-lg font-bold
                  ${matchPercentage >= 80 ? 'text-emerald-600' : matchPercentage >= 60 ? 'text-amber-600' : 'text-slate-600'}
                `}>
                  {matchPercentage}%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">match</span>
            </div>
          </div>
          
          {/* Location & Salary */}
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location} · {locationType}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {salaryRange}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <CardContent className="pt-0 pb-4">
          <p className="text-sm text-slate-600 line-clamp-3">{description}</p>
        </CardContent>
        
        {/* Skills */}
        <div className="px-5 pb-4">
          <div className="space-y-2">
            {/* Matching Skills */}
            {matchingSkills.length > 0 && (
              <div>
                <p className="text-[10px] font-medium text-slate-500 uppercase mb-1.5">Your matching skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {matchingSkills.map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-xs text-emerald-700"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Required Skills */}
            {requiredSkills.length > 0 && (
              <div>
                <p className="text-[10px] font-medium text-slate-500 uppercase mb-1.5">Required skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {requiredSkills.map((skill) => (
                    <span 
                      key={skill} 
                      className={`px-2 py-1 rounded-md text-xs ${
                        matchingSkills.includes(skill) 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
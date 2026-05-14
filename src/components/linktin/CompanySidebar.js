'use client'

import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Building2, MapPin, Users, Briefcase, TrendingUp } from 'lucide-react'

export function CompanySidebar({
  companyName = 'Company',
  sector = 'Sector',
  location = 'Location',
  activeJobPosts = 0,
  totalCandidates = 0,
  newMatches = 0,
  activeTab = 'dashboard'
}) {
  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 p-4 flex-shrink-0">
      <div className="space-y-4">
        {/* Company Info Card */}
        <Card>
          <CardContent className="p-4">
            {/* Banner */}
            <div className="h-12 -mx-4 -mt-4 mb-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-t-xl" />
            
            {/* Logo & Info */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center mx-auto -mt-7 shadow-sm">
                <Building2 className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mt-2">{companyName}</h3>
              <p className="text-sm text-slate-500">{sector}</p>
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {location}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-slate-600">Active Jobs</span>
            </div>
            <span className="font-semibold text-slate-900">{activeJobPosts}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-slate-600">Candidates</span>
            </div>
            <span className="font-semibold text-slate-900">{totalCandidates}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-700">New Matches</span>
            </div>
            <Badge variant="success">{newMatches}</Badge>
          </div>
        </div>
      </div>
    </aside>
  )
}
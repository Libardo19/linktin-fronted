'use client'

import { Card, CardContent } from '../ui/Card'
import { Progress } from '../ui/Progress'
import { Badge } from '../ui/Badge'
import { Building2, MapPin, Briefcase, Users, TrendingUp, Star } from 'lucide-react'

export function CompanySidebar({
  companyName = 'Company',
  sector = 'Sector',
  location = 'Location',
  activeJobPosts = 0,
  totalCandidates = 0,
  newMatches = 0,
  profileCompletion = 80,
  rating = 4.5,
  founded = '2018',
  employees = '50-200'
}) {
  return (
    <div className="space-y-4">
      {/* Company Info Card */}
      <Card>
        <CardContent className="p-4">
          {/* Banner */}
          <div className="h-16 -mx-4 -mt-4 mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-t-xl" />
          
          {/* Logo */}
          <div className="relative -mt-8 mb-3">
            <div className="w-20 h-20 rounded-xl border-4 border-white bg-white flex items-center justify-center mx-auto shadow-sm">
              <Building2 className="h-10 w-10 text-blue-600" />
            </div>
            <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px]">
              Verified
            </Badge>
          </div>
          
          {/* Info */}
          <div className="text-center">
            <h3 className="font-semibold text-slate-900">{companyName}</h3>
            <p className="text-sm text-slate-500">{sector}</p>
            <div className="mt-2 space-y-1 text-xs text-slate-500">
              <p className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                {location}
              </p>
              <div className="flex items-center justify-center gap-1">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span className="text-amber-600 font-medium">{rating}</span>
                <span className="text-slate-400">· {employees} emp · Fund. {founded}</span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-center">
              <div>
                <p className="text-lg font-semibold text-slate-900">{activeJobPosts}</p>
                <p className="text-xs text-slate-500">Active Jobs</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{totalCandidates}</p>
                <p className="text-xs text-slate-500">Candidates</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-blue-600">{newMatches}</p>
                <p className="text-xs text-slate-500">New Matches</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Profile Strength */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Company Profile
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                {profileCompletion < 30 ? 'Beginner' : profileCompletion < 60 ? 'Intermediate' : 'Strong'}
              </span>
              <span className="font-semibold text-blue-600">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>
          
          {profileCompletion < 100 && (
            <div className="space-y-1.5 pt-2">
              <p className="text-xs text-slate-500">Complete these to improve:</p>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">Add company logo</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">Describe your benefits</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

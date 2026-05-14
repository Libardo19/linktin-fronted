'use client'

import { Card, CardContent } from '../ui/Card'
import { Progress } from '../ui/Progress'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { MapPin, GraduationCap, TrendingUp } from 'lucide-react'

export function ProfileSidebar({ 
  name = 'Your Name',
  title = 'Your Title',
  university = 'University',
  location = 'Location',
  profileCompletion = 0,
  isOpenToWork = false,
  connections = 0,
  profileViews = 0,
  searchAppearances = 0
}) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  
  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <Card>
        <CardContent className="p-4">
          {/* Banner */}
          <div className="h-16 -mx-4 -mt-4 mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-t-xl" />
          
          {/* Avatar */}
          <div className="relative -mt-8 mb-3">
            <div className="w-20 h-20 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-blue-600">{initials}</span>
            </div>
            {isOpenToWork && (
              <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px]">
                Open to Work
              </Badge>
            )}
          </div>
          
          {/* Info */}
          <div className="text-center">
            <h3 className="font-semibold text-slate-900">{name}</h3>
            <p className="text-sm text-slate-500">{title}</p>
            <div className="mt-2 space-y-1 text-xs text-slate-500">
              <p>{university}</p>
              <p className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                {location}
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-center">
              <div>
                <p className="text-lg font-semibold text-slate-900">{connections}</p>
                <p className="text-xs text-slate-500">Connections</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{profileViews}</p>
                <p className="text-xs text-slate-500">Profile views</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{searchAppearances}</p>
                <p className="text-xs text-slate-500">Search appearances</p>
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
            Profile Strength
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
              {profileCompletion < 30 && (
                <>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-slate-600">Add a profile photo</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-slate-600">Add 3 more skills</span>
                  </div>
                </>
              )}
              {profileCompletion < 60 && (
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-slate-600">Write a longer bio</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
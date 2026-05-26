'use client'

import { useState } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Search, Filter, Building2, MapPin, GraduationCap, Mail, Eye, CheckCircle, XCircle } from 'lucide-react'

const matchedCandidates = [
  {
    id: 1,
    name: 'María García López',
    title: 'Frontend Developer',
    university: 'Universidad de los Andes',
    location: 'Bogotá, Colombia',
    matchPercentage: 92,
    skills: ['React', 'TypeScript', 'Node.js', 'CSS'],
    jobTitle: 'Frontend Developer',
    status: 'new',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    title: 'Full Stack Developer',
    university: 'Universidad Nacional',
    location: 'Medellín, Colombia',
    matchPercentage: 88,
    skills: ['Python', 'Django', 'React', 'PostgreSQL'],
    jobTitle: 'Backend Engineer',
    status: 'interview',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    title: 'Software Engineer',
    university: 'Universidad del Valle',
    location: 'Cali, Colombia',
    matchPercentage: 85,
    skills: ['Java', 'Spring Boot', 'React', 'AWS'],
    jobTitle: 'Full Stack Developer',
    status: 'review',
  },
  {
    id: 4,
    name: 'Pedro López',
    title: 'DevOps Engineer',
    university: 'Universidad Sergio Arboleda',
    location: 'Bogotá, Colombia',
    matchPercentage: 78,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    jobTitle: 'DevOps Engineer',
    status: 'new',
  },
]

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  review: 'bg-amber-100 text-amber-700',
  interview: 'bg-emerald-100 text-emerald-700',
  hired: 'bg-slate-100 text-slate-700',
}

const statusLabels = {
  new: 'New Match',
  review: 'In Review',
  interview: 'Interview',
  hired: 'Hired',
}

export default function EmpresaMatchesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredCandidates = matchedCandidates.filter((candidate) => {
    if (statusFilter !== 'all' && candidate.status !== statusFilter) return false
    if (searchQuery && !candidate.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="match" notificationCount={7} type="empresa" />
      
      <div className="flex pt-14">
        <CompanySidebar
          companyName="TechCorp Colombia"
          sector="Technology"
          location="Bogotá (Remote)"
          activeJobPosts={4}
          totalCandidates={23}
          newMatches={7}
        />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-[1000px] mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Candidate Matches</h1>
              <p className="text-sm text-slate-500 mt-1">View and manage candidates matched to your job postings</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold text-slate-900">4</p>
                  <p className="text-sm text-slate-500">Total Matches</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-slate-500">New</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold text-amber-600">1</p>
                  <p className="text-sm text-slate-500">In Review</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold text-emerald-600">1</p>
                  <p className="text-sm text-slate-500">Interview</p>
                </CardContent>
              </Card>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search candidates..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                {['all', 'new', 'review', 'interview'].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className="capitalize"
                  >
                    {status === 'all' ? 'All' : statusLabels[status]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Candidates List */}
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-blue-600">
                          {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-slate-900">{candidate.name}</h3>
                          <Badge className={statusColors[candidate.status]}>
                            {statusLabels[candidate.status]}
                          </Badge>
                          <span className="text-sm font-medium text-blue-600">
                            {candidate.matchPercentage}% match
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{candidate.title}</p>
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {candidate.university}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {candidate.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
'use client'

import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Plus, Search, Eye, Users, MoreHorizontal, MapPin, DollarSign, Clock } from 'lucide-react'
import Link from 'next/link'

const jobOffers = [
  {
    id: 1,
    title: 'Frontend Developer',
    location: 'Remote',
    salary: '$2,500 - $4,000',
    type: 'Full-time',
    postedDate: '2 days ago',
    views: 245,
    applications: 32,
    matches: 12,
    status: 'active',
    skills: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: 2,
    title: 'Backend Engineer',
    location: 'Bogotá (Hybrid)',
    salary: '$3,000 - $5,000',
    type: 'Full-time',
    postedDate: '5 days ago',
    views: 189,
    applications: 28,
    matches: 8,
    status: 'active',
    skills: ['Python', 'Django', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    location: 'Remote',
    salary: '$2,800 - $4,500',
    type: 'Full-time',
    postedDate: '1 week ago',
    views: 312,
    applications: 45,
    matches: 15,
    status: 'active',
    skills: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    location: 'Medellín (On-site)',
    salary: '$3,500 - $6,000',
    type: 'Full-time',
    postedDate: '2 weeks ago',
    views: 98,
    applications: 12,
    matches: 4,
    status: 'paused',
    skills: ['AWS', 'Docker', 'Kubernetes'],
  },
]

export default function OfertasPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="jobs" notificationCount={7} type="empresa" />
      
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Job Posts</h1>
                <p className="text-sm text-slate-500 mt-1">Manage your job postings and applications</p>
              </div>
              <Link href="/dashboardempresa/ofertas/nueva">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Post New Job
                </Button>
              </Link>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search job posts..." className="pl-9" />
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {jobOffers.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                          <Badge variant={job.status === 'active' ? 'success' : 'secondary'}>
                            {job.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.postedDate}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-slate-900">{job.views}</p>
                          <p className="text-xs text-slate-500">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-slate-900">{job.applications}</p>
                          <p className="text-xs text-slate-500">Applications</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-blue-600">{job.matches}</p>
                          <p className="text-xs text-slate-500">Matches</p>
                        </div>
                        <div className="flex gap-1">
                          <Link href={`/dashboardempresa/ofertas/${job.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboardempresa/ofertas/${job.id}/editar`}>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </Link>
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
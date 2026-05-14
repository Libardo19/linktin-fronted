'use client'

import { useState } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { CandidateCard } from '@/components/linktin/CandidateCard'
import { MatchActions } from '@/components/linktin/MatchActions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Plus, Eye, Users, TrendingUp, MoreHorizontal, GripVertical } from 'lucide-react'

const candidates = [
  {
    id: 1,
    name: 'María García López',
    title: 'Frontend Developer',
    university: 'Universidad de los Andes',
    location: 'Bogotá, Colombia',
    matchPercentage: 92,
    skills: ['React', 'TypeScript', 'Node.js', 'CSS', 'Git', 'Jest'],
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    title: 'Full Stack Developer',
    university: 'Universidad Nacional',
    location: 'Medellín, Colombia',
    matchPercentage: 88,
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
  },
  {
    id: 3,
    name: 'Ana Martínez',
    title: 'Software Engineer',
    university: 'Universidad del Valle',
    location: 'Cali, Colombia',
    matchPercentage: 85,
    skills: ['Java', 'Spring Boot', 'React', 'AWS', 'MongoDB'],
  },
]

const jobPosts = [
  { id: 1, title: 'Frontend Developer', views: 245, applications: 32, matches: 12, status: 'active' },
  { id: 2, title: 'Backend Engineer', views: 189, applications: 28, matches: 8, status: 'active' },
  { id: 3, title: 'Full Stack Developer', views: 312, applications: 45, matches: 15, status: 'active' },
  { id: 4, title: 'DevOps Engineer', views: 98, applications: 12, matches: 4, status: 'paused' },
]

const pipelineCandidates = {
  newMatches: [
    { id: 1, name: 'María García', matchPercentage: 92 },
    { id: 2, name: 'Carlos R.', matchPercentage: 88 },
    { id: 3, name: 'Ana M.', matchPercentage: 85 },
  ],
  inReview: [
    { id: 4, name: 'Pedro López', matchPercentage: 90 },
    { id: 5, name: 'Laura Díaz', matchPercentage: 87 },
  ],
  interview: [
    { id: 6, name: 'Juan Pérez', matchPercentage: 94 },
  ],
}

const topSkills = [
  { name: 'React', percentage: 85 },
  { name: 'TypeScript', percentage: 72 },
  { name: 'Node.js', percentage: 68 },
  { name: 'Python', percentage: 55 },
]

export default function EmpresaDashboardPage() {
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)

  const currentCandidate = candidates[currentCandidateIndex]
  const nextCandidate = candidates[currentCandidateIndex + 1]

  const handlePass = () => {
    setSwipeDirection('left')
    setTimeout(() => {
      setSwipeDirection(null)
      if (currentCandidateIndex < candidates.length - 1) {
        setCurrentCandidateIndex(currentCandidateIndex + 1)
      }
    }, 300)
  }

  const handleInterested = () => {
    setSwipeDirection('right')
    setTimeout(() => {
      setSwipeDirection(null)
      if (currentCandidateIndex < candidates.length - 1) {
        setCurrentCandidateIndex(currentCandidateIndex + 1)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="home" notificationCount={7} type="empresa" />
      
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
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8 space-y-6">
                {/* Candidate Matching Panel */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Candidate Matching</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {candidates.length - currentCandidateIndex} candidates to review
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-[340px] h-[420px]">
                        {nextCandidate && (
                          <div className="absolute inset-x-4 top-4 h-full">
                            <CandidateCard {...nextCandidate} isTopCard={false} />
                          </div>
                        )}
                        {currentCandidate ? (
                          <div className="absolute inset-0">
                            <CandidateCard
                              {...currentCandidate}
                              swipeDirection={swipeDirection}
                              isTopCard={true}
                            />
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                            <Users className="h-12 w-12 text-slate-400 mb-3" />
                            <h3 className="text-base font-semibold text-slate-900">All caught up!</h3>
                            <p className="text-sm text-slate-500 text-center mt-2 px-6">
                              You've reviewed all matching candidates
                            </p>
                          </div>
                        )}
                      </div>

                      {currentCandidate && (
                        <MatchActions
                          onPass={handlePass}
                          onInterested={handleInterested}
                          onHoverPass={(h) => !swipeDirection && setSwipeDirection(h ? 'left' : null)}
                          onHoverInterested={(h) => !swipeDirection && setSwipeDirection(h ? 'right' : null)}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Pipeline Board */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Hiring Pipeline</CardTitle>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-slate-900">New Matches</h4>
                          <Badge variant="secondary" className="text-xs">
                            {pipelineCandidates.newMatches.length}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {pipelineCandidates.newMatches.map((candidate) => (
                            <div
                              key={candidate.id}
                              className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200 cursor-move"
                            >
                              <GripVertical className="h-3 w-3 text-slate-400" />
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                                {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <span className="text-sm flex-1 truncate">{candidate.name}</span>
                              <span className="text-xs text-blue-600 font-medium">{candidate.matchPercentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-slate-900">In Review</h4>
                          <Badge variant="secondary" className="text-xs">
                            {pipelineCandidates.inReview.length}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {pipelineCandidates.inReview.map((candidate) => (
                            <div
                              key={candidate.id}
                              className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200 cursor-move"
                            >
                              <GripVertical className="h-3 w-3 text-slate-400" />
                              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-600">
                                {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <span className="text-sm flex-1 truncate">{candidate.name}</span>
                              <span className="text-xs text-amber-600 font-medium">{candidate.matchPercentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-slate-900">Interview Stage</h4>
                          <Badge variant="secondary" className="text-xs">
                            {pipelineCandidates.interview.length}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {pipelineCandidates.interview.map((candidate) => (
                            <div
                              key={candidate.id}
                              className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200 cursor-move"
                            >
                              <GripVertical className="h-3 w-3 text-slate-400" />
                              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-medium text-emerald-600">
                                {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <span className="text-sm flex-1 truncate">{candidate.name}</span>
                              <span className="text-xs text-emerald-600 font-medium">{candidate.matchPercentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Posts Table */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Job Posts</CardTitle>
                    <Button size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Post New Job
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left text-xs font-medium text-slate-500 py-3 px-2">Job Title</th>
                            <th className="text-center text-xs font-medium text-slate-500 py-3 px-2">Views</th>
                            <th className="text-center text-xs font-medium text-slate-500 py-3 px-2">Applications</th>
                            <th className="text-center text-xs font-medium text-slate-500 py-3 px-2">Matches</th>
                            <th className="text-center text-xs font-medium text-slate-500 py-3 px-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobPosts.map((job) => (
                            <tr key={job.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                              <td className="py-3 px-2">
                                <span className="text-sm font-medium text-slate-900">{job.title}</span>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <span className="text-sm text-slate-500">{job.views}</span>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <span className="text-sm text-slate-500">{job.applications}</span>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <span className="text-sm font-medium text-blue-600">{job.matches}</span>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <Badge 
                                  variant={job.status === 'active' ? 'success' : 'secondary'}
                                >
                                  {job.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Analytics */}
              <div className="col-span-4 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      Profile Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between h-24 gap-1">
                      {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-blue-200 rounded-t transition-all hover:bg-blue-300"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mt-4">1,247</p>
                    <p className="text-xs text-slate-500">views this week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      Top Skills in Demand
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topSkills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-900">{skill.name}</span>
                          <span className="text-slate-500">{skill.percentage}%</span>
                        </div>
                        <Progress value={skill.percentage} className="h-1.5" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Match Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center py-4">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-200" />
                          <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="12" strokeDasharray={`${0.73 * 352} ${352}`} className="text-blue-600" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-slate-900">73%</span>
                          <span className="text-xs text-slate-500">match rate</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-slate-500">Matched</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                        <span className="text-slate-500">Pending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full gap-2" size="lg">
                  <Plus className="h-5 w-5" />
                  Post New Job
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
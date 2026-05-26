'use client'

import { GlobalNavigation } from '@/components/linktin/Navigation'
import { CompanySidebar } from '@/components/linktin/CompanySidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Briefcase, MapPin, DollarSign, Clock, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function NuevaOfertaPage() {
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
          <div className="max-w-[800px] mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Post New Job</h1>
              <p className="text-sm text-slate-500 mt-1">Create a new job posting to attract candidates</p>
            </div>

            <form className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g., Frontend Developer" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the role, responsibilities, and requirements..."
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea 
                      id="requirements" 
                      placeholder="List the required skills and qualifications..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location & Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location & Employment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location Type</Label>
                      <select className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Remote</option>
                        <option>On-site</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <select className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="e.g., Bogotá, Colombia" />
                  </div>
                </CardContent>
              </Card>

              {/* Salary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Salary Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Minimum Salary</Label>
                      <Input type="number" placeholder="$0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum Salary</Label>
                      <Input type="number" placeholder="$0" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Input placeholder="Add skills (press Enter)" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['React', 'TypeScript', 'Node.js'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-2">
                          {skill}
                          <button className="hover:text-blue-900">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <Link href="/dashboardempresa/ofertas">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button>Post Job</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { MatchCard } from '@/components/linktin/MatchCard'
import { MatchActions } from '@/components/linktin/MatchActions'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SlidersHorizontal, Building2, Sparkles } from 'lucide-react'

const jobMatches = [
  {
    id: 1,
    companyName: 'TechCorp',
    isVerified: true,
    jobTitle: 'Frontend Developer',
    location: 'Bogotá, Colombia',
    locationType: 'Remote',
    salaryRange: '$2,500 - $4,000',
    matchPercentage: 91,
    description: 'Join our innovative team to build cutting-edge web applications using React and modern technologies.',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Git'],
    matchingSkills: ['React', 'Git'],
  },
  {
    id: 2,
    companyName: 'DataFlow Inc',
    isVerified: true,
    jobTitle: 'Full Stack Developer',
    location: 'Medellín, Colombia',
    locationType: 'Hybrid',
    salaryRange: '$3,000 - $5,000',
    matchPercentage: 87,
    description: 'We are looking for a talented developer to help us scale our data processing platform.',
    requiredSkills: ['Python', 'React', 'PostgreSQL', 'AWS'],
    matchingSkills: ['Python', 'React'],
  },
  {
    id: 3,
    companyName: 'StartupX',
    isVerified: false,
    jobTitle: 'Junior Developer',
    location: 'Remote',
    locationType: 'Remote',
    salaryRange: '$1,500 - $2,500',
    matchPercentage: 78,
    description: 'Great opportunity for a junior developer to learn and grow with a fast-paced startup.',
    requiredSkills: ['JavaScript', 'React', 'SQL'],
    matchingSkills: ['JavaScript', 'React', 'SQL'],
  },
]

const matchedCompanies = [
  { id: 1, name: 'Google', hasUnread: true },
  { id: 2, name: 'Meta', hasUnread: false },
  { id: 3, name: 'Amazon', hasUnread: true },
  { id: 4, name: 'Microsoft', hasUnread: false },
  { id: 5, name: 'Apple', hasUnread: false },
]

export default function MatchesPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [remainingMatches, setRemainingMatches] = useState(10)

  const currentJob = jobMatches[currentIndex]
  const nextJob = jobMatches[currentIndex + 1]

  const handlePass = () => {
    setSwipeDirection('left')
    setTimeout(() => {
      setSwipeDirection(null)
      if (currentIndex < jobMatches.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setRemainingMatches(remainingMatches - 1)
      }
    }, 300)
  }

  const handleInterested = () => {
    setSwipeDirection('right')
    setTimeout(() => {
      setSwipeDirection(null)
      if (currentIndex < jobMatches.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setRemainingMatches(remainingMatches - 1)
      }
    }, 300)
  }

  const handleSuperApply = () => {
    setSwipeDirection('right')
    setTimeout(() => {
      setSwipeDirection(null)
      if (currentIndex < jobMatches.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setRemainingMatches(remainingMatches - 1)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="match" notificationCount={5} type="candidato" />
      
      <main className="max-w-[1440px] mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1.5 text-amber-500" />
            {remainingMatches} remaining matches today
          </Badge>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[380px] h-[580px]">
            {nextJob && (
              <>
                <div className="absolute inset-x-4 top-4 h-full">
                  <MatchCard
                    {...nextJob}
                    isTopCard={false}
                  />
                </div>
                <div className="absolute inset-x-2 top-2 h-full opacity-50">
                  <div className="w-full h-full bg-white rounded-lg shadow-md" />
                </div>
              </>
            )}

            {currentJob ? (
              <div className="absolute inset-0">
                <MatchCard
                  {...currentJob}
                  swipeDirection={swipeDirection}
                  isTopCard={true}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                <Building2 className="h-16 w-16 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">No more matches</h3>
                <p className="text-sm text-slate-500 text-center mt-2 px-8">
                  You've seen all available matches for today. Check back tomorrow!
                </p>
              </div>
            )}
          </div>

          {currentJob && (
            <MatchActions
              onPass={handlePass}
              onSuperApply={handleSuperApply}
              onInterested={handleInterested}
              onHoverPass={(hovering) => !swipeDirection && setSwipeDirection(hovering ? 'left' : null)}
              onHoverInterested={(hovering) => !swipeDirection && setSwipeDirection(hovering ? 'right' : null)}
            />
          )}

          <div className="flex items-center justify-center gap-8 mt-4 text-xs text-slate-500">
            <span>← Swipe left to pass</span>
            <span>Swipe right to apply →</span>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">My Matches</h3>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {matchedCompanies.map((company) => (
              <button
                key={company.id}
                className="flex-shrink-0 relative group"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-emerald-500 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                  <Building2 className="h-8 w-8 text-slate-500" />
                </div>
                {company.hasUnread && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white" />
                )}
                <p className="text-xs text-center mt-1 text-slate-500 truncate max-w-16">
                  {company.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
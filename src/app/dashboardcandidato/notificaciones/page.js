'use client'

import { useState } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { NotificationItem } from '@/components/linktin/NotificationItem'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const notifications = [
  {
    id: 1,
    type: 'match',
    title: 'TechCorp liked your profile! You have a new Match',
    timestamp: '2 hours ago',
    isUnread: true,
    companyName: 'TechCorp',
    jobTitle: 'Frontend Developer',
    matchPercentage: 91,
  },
  {
    id: 2,
    type: 'view',
    title: '3 companies viewed your profile today',
    description: 'DataFlow Inc, StartupX, and 1 other',
    timestamp: '4 hours ago',
    isUnread: true,
    actionLabel: 'See who',
  },
  {
    id: 3,
    type: 'job',
    title: 'New job matching 94%: Senior React Developer at Startup X',
    description: 'Remote · $3,500 - $5,000',
    timestamp: '6 hours ago',
    isUnread: true,
    actionLabel: 'View Job',
  },
  {
    id: 4,
    type: 'review',
    title: 'You received a 5-star review from DataCorp',
    description: 'Great communication skills and technical knowledge!',
    timestamp: '1 day ago',
    isUnread: false,
    actionLabel: 'See Review',
  },
  {
    id: 5,
    type: 'reminder',
    title: 'Complete your profile to get 3x more matches',
    description: 'Add your work experience and skills',
    timestamp: '2 days ago',
    isUnread: false,
    actionLabel: 'Complete Now',
  },
  {
    id: 6,
    type: 'match',
    title: 'GlobalTech Solutions wants to connect with you!',
    timestamp: '3 days ago',
    isUnread: false,
    companyName: 'GlobalTech Solutions',
    jobTitle: 'Full Stack Developer',
    matchPercentage: 89,
  },
]

export default function NotificacionesPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'matches' && notif.type === 'match') return true
    if (activeFilter === 'jobs' && notif.type === 'job') return true
    return false
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="notifications" notificationCount={5} type="candidato" />
      
      <main className="max-w-[800px] mx-auto px-4 py-6 pt-20">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Notifications</h1>

        <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
          {['all', 'matches', 'jobs', 'messages', 'mentions'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="capitalize whitespace-nowrap"
            >
              {filter}
            </Button>
          ))}
        </div>

        <Card className="overflow-hidden">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-500">No notifications in this category</p>
            </div>
          )}
        </Card>

        {filteredNotifications.some(n => n.isUnread) && (
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
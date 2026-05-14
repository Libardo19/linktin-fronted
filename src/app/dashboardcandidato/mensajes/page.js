'use client'

import { useState } from 'react'
import { GlobalNavigation } from '@/components/linktin/Navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Search, Send, Building2, MapPin, DollarSign, Briefcase } from 'lucide-react'

const conversations = [
  {
    id: 1,
    companyName: 'TechCorp',
    jobTitle: 'Frontend Developer',
    lastMessage: 'We would love to schedule an interview with you. Are you available next week?',
    timestamp: '2:30 PM',
    unreadCount: 2,
    isOnline: true,
    isFromMatch: true,
    matchedDaysAgo: 2,
  },
  {
    id: 2,
    companyName: 'DataFlow Inc',
    jobTitle: 'Full Stack Developer',
    lastMessage: "Thank you for your interest! We'll review your application shortly.",
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    isFromMatch: true,
    matchedDaysAgo: 5,
  },
  {
    id: 3,
    companyName: 'StartupX',
    jobTitle: 'Junior Developer',
    lastMessage: 'Looking forward to hearing from you!',
    timestamp: '3 days ago',
    unreadCount: 0,
    isOnline: true,
    isFromMatch: false,
    matchedDaysAgo: 10,
  },
]

const messages = [
  { id: '1', content: "Hi! We reviewed your profile and we're impressed with your skills.", timestamp: 'Yesterday, 10:00 AM', isSent: false, isRead: true },
  { id: '2', content: 'Thank you so much! I\'m very interested in the Frontend Developer position.', timestamp: 'Yesterday, 10:15 AM', isSent: true, isRead: true },
  { id: '3', content: "Great! Your React experience aligns well with what we're looking for.", timestamp: 'Yesterday, 11:00 AM', isSent: false, isRead: true },
  { id: '4', content: 'We would love to schedule an interview with you. Are you available next week?', timestamp: 'Today, 2:30 PM', isSent: false, isRead: false },
]

export default function MensajesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const filteredConversations = conversations.filter((conv) => {
    if (activeFilter === 'matches' && !conv.isFromMatch) return false
    if (activeFilter === 'unread' && conv.unreadCount === 0) return false
    if (searchQuery && !conv.companyName.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    console.log('Sending:', newMessage)
    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalNavigation activeTab="messages" notificationCount={5} type="candidato" />
      
      <main className="max-w-[1440px] mx-auto h-[calc(100vh-56px)] pt-14">
        <div className="flex h-full border-x border-slate-200 bg-white">
          <div className="w-[380px] border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search messages..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-1 p-2 border-b border-slate-200">
              {['all', 'matches', 'unread'].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`
                    flex items-start gap-3 p-4 cursor-pointer border-b border-slate-100
                    hover:bg-slate-50 transition-colors
                    ${activeConversation.id === conversation.id ? 'bg-blue-50' : ''}
                  `}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900 truncate">{conversation.companyName}</h4>
                      <span className="text-xs text-slate-400">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{conversation.jobTitle}</p>
                    <p className="text-sm text-slate-600 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="default" className="flex-shrink-0">{conversation.unreadCount}</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{activeConversation.companyName}</h3>
                    <p className="text-xs text-slate-500">{activeConversation.jobTitle}</p>
                  </div>
                </div>
                {activeConversation.isOnline && (
                  <Badge variant="success">Online</Badge>
                )}
              </div>
              
              {activeConversation.isFromMatch && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg flex items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Remote
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    $2,500 - $4,000
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    Full-time
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[70%] p-3 rounded-lg
                      ${msg.isSent 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-slate-100 text-slate-900 rounded-bl-none'
                      }
                    `}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-[10px] mt-1 ${msg.isSent ? 'text-blue-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
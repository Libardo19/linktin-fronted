'use client'

import Link from 'next/link'
import { Heart, Briefcase, Eye, Award, Bell, MessageCircle } from 'lucide-react'
import { Button } from '../ui/Button'

const icons = {
  match: Heart,
  job: Briefcase,
  view: Eye,
  review: Award,
  reminder: Bell,
  message: MessageCircle,
}

export function NotificationItem({
  type = 'match',
  title = '',
  description = '',
  timestamp = '',
  isUnread = false,
  actionLabel,
  onAction,
  href,
}) {
  const Icon = icons[type] || Bell
  const content = (
    <div className={`
      flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors
      ${isUnread ? 'bg-blue-50/50' : ''}
    `}>
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
        ${type === 'match' ? 'bg-emerald-100 text-emerald-600' :
          type === 'job' ? 'bg-blue-100 text-blue-600' :
          type === 'view' ? 'bg-purple-100 text-purple-600' :
          'bg-slate-100 text-slate-600'}
      `}>
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm ${isUnread ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
          {title}
        </p>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        )}
        <p className="text-xs text-slate-400 mt-1">{timestamp}</p>
      </div>

      {actionLabel && onAction && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onAction()
          }}
          className="text-blue-600 hover:text-blue-700 z-10"
        >
          {actionLabel}
        </Button>
      )}

      {isUnread && (
        <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {content}
      </Link>
    )
  }

  return content
}
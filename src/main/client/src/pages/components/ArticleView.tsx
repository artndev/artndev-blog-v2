import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { I_ArticleProps } from '../types'
import { Badge } from '@/components/ui/badge'
import Markdown from 'react-markdown'

const ArticleView: React.FC<I_ArticleProps> = ({
  id,
  title,
  content,
  updated,
  className,
}) => {
  const navigate = useNavigate()

  return (
    <div className={cn(`flex flex-col gap-6 w-full`, className)}>
      <div className="flex flex-col gap-2 text-2xl font-semibold hanken-grotesk">
        {title}
        <Badge className="h-[max-content]">ID: {id}</Badge>
      </div>
      <div className="flex flex-col gap-3">
        <Markdown>{content}</Markdown>
      </div>
      <span className="text-sm text-(--muted-foreground)">
        Updated at {updated}
      </span>
      <Button
        variant={'outline'}
        className="self-end min-w-[200px] rounded-full"
        onClick={() => navigate('/articles')}
      >
        Back to articles
      </Button>
    </div>
  )
}

export default ArticleView

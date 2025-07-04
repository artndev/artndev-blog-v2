import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import Markdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import type { I_ArticleProps } from '../types'

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
      <div className="flex justify-end gap-6 w-full">
        <Button
          variant={'outline'}
          className="flex-1 max-w-[200px] rounded-full"
          onClick={() => navigate('/articles')}
        >
          <ArrowLeft />
          Back to articles
        </Button>
        <Button
          className="flex-1 max-w-[200px] rounded-full"
          onClick={() => navigate('/articles')}
        >
          Next article
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default ArticleView

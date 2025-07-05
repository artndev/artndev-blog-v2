import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { I_ArticleProps } from '../types'
import RichEditor from './RichEditor'

const ArticleView: React.FC<I_ArticleProps> = ({
  id,
  title,
  content,
  updated,
  className,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className={cn(
        `flex flex-col justify-between gap-12 w-full h-full`,
        className
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-2xl font-semibold hanken-grotesk">
          {title}
          <Badge className="h-[max-content]">ID: {id}</Badge>
        </div>
        <RichEditor value={content} editable={false} toolbarDisabled={true} />
        <span className="text-sm text-(--muted-foreground)">
          Updated at {updated}
        </span>
      </div>
      <div className="flex justify-end gap-6">
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
          onClick={() => navigate(`/articles`)}
        >
          Next article
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default ArticleView

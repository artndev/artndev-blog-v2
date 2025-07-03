import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { I_ArticleProps } from '../types'

const ArticleView: React.FC<Omit<I_ArticleProps, 'id'>> = ({
  title,
  content,
  updated,
  className,
}) => {
  const navigate = useNavigate()

  return (
    <div className={cn(`flex flex-col gap-3 w-[min(1000px,_100%)]`, className)}>
      <span className="text-2xl font-semibold">{title}</span>
      <span>{content}</span>
      <span className="text-sm text-(--muted-foreground)">
        Updated at {updated}
      </span>
      <Button
        variant={'outline'}
        className="self-end w-[200px] rounded-full mt-3 cursor-pointer"
        onClick={() => navigate('/articles')}
      >
        Back to surfing
      </Button>
    </div>
  )
}

export default ArticleView

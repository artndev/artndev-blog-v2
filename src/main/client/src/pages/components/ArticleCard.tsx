import ArrowButton from '@/components/custom/arrow-button'
import { cn } from '@/lib/utils.js'
import type { I_ArticleProps } from '@/pages/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleCard: React.FC<I_ArticleProps> = ({
  id,
  title,
  content,
  updated,
  className,
}) => {
  const navigate = useNavigate()

  return (
    <div className={cn(`flex flex-col gap-4 w-full`, className)}>
      <div className="text-2xl font-semibold hanken-grotesk leading-none">
        {title}
      </div>
      <hr />
      <div className="text-muted-foreground text-sm">Updated at {updated}</div>
      <span>{content}</span>
      <hr />
      <ArrowButton
        direction="right"
        content="Read more"
        onClick={() => navigate(`/articles/${id}`)}
        className="self-end"
      />
    </div>
  )
}

export default ArticleCard

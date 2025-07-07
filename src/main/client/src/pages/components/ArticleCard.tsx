import ButtonArrow from '@/components/custom/button-arrow'
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
      <span className="text-muted-foreground text-sm">
        Updated at {updated}
      </span>
      <span>{content}</span>
      <hr />
      <ButtonArrow
        direction="right"
        content="Read more"
        onClick={() => navigate(`/articles/${id}`)}
        className="self-end"
      />
    </div>
  )
}

export default ArticleCard

import ArrowButton from '@/components/custom/arrow-button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils.js'
import type { I_ArticleProps } from '@/pages/types'
import { Calendar } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleCard: React.FC<I_ArticleProps> = ({
  id,
  title,
  content,
  updated,
  tags,
  className,
  ...props
}) => {
  const navigate = useNavigate()

  return (
    <div className={cn(`flex flex-col gap-4 w-full`, className)} {...props}>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold hanken-grotesk leading-none">
          {title}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => {
            return (
              <Badge variant={'outline'} key={i}>
                {tag}
              </Badge>
            )
          })}
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Calendar size={15} />
        Updated at {updated}
      </div>
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

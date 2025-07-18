import ArrowButton from '@/components/custom/arrow-button'
import { Badge } from '@/components/ui/badge'
import { useOrderContext } from '@/hooks/use-order-context.js'
import { cn } from '@/lib/utils.js'
import RichEditor from '@/pages/components/RichEditor'
import type { I_ArticleProps } from '@/pages/types'
import { Calendar } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleView: React.FC<I_ArticleProps> = ({
  id,
  title,
  content,
  updated,
  tags,
  className,
  ...props
}) => {
  const navigate = useNavigate()
  const { order } = useOrderContext()

  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-4 w-full h-full',
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
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
        <RichEditor value={content} editable={false} toolbarDisabled={true} />
      </div>
      <div className="flex-1 flex flex-col justify-end gap-12">
        <hr />
        <div className="flex justify-between gap-4">
          <ArrowButton
            direction="left"
            content="Back to articles"
            onClick={() => navigate('/articles')}
          />
          {order && order[id] && (
            <ArrowButton
              direction="right"
              content="Next article"
              onClick={() => {
                navigate(`/articles/${order[id]}`)
                navigate(0)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleView

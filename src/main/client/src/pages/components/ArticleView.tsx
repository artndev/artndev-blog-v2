import ArrowButton from '@/components/custom/arrow-button'
import { useOrderContext } from '@/hooks/use-order-context.js'
import { cn } from '@/lib/utils.js'
import RichEditor from '@/pages/components/RichEditor'
import type { I_ArticleProps } from '@/pages/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleView: React.FC<I_ArticleProps> = ({
  id,
  title,
  content,
  updated,
  className,
}) => {
  const navigate = useNavigate()
  const { order } = useOrderContext()

  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-4 w-full h-full',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-semibold hanken-grotesk leading-none">
          {title}
        </div>
        <hr />
        <span className="text-sm text-muted-foreground">
          Updated at {updated}
        </span>
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

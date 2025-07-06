import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useOrderContext } from '@/hooks/use-order-context.js'
import { cn } from '@/lib/utils.js'
import RichEditor from '@/pages/components/RichEditor'
import type { I_ArticleProps } from '@/pages/types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
        `flex flex-col justify-between gap-12 w-full h-full`,
        className
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-2xl font-semibold hanken-grotesk leading-none">
          {title}
          <Badge className="h-[max-content]">ID: {id}</Badge>
        </div>
        <RichEditor value={content} editable={false} toolbarDisabled={true} />
        <span className="text-sm text-muted-foreground">
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
        {order && order[id] && (
          <Button
            className="flex-1 max-w-[200px] rounded-full"
            onClick={() => {
              navigate(`/articles/${order[id]}`)
              navigate(0)
            }}
          >
            Next article
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ArticleView

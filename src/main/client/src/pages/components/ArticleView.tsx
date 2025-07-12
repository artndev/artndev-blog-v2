import ArrowButton from '@/components/custom/arrow-button'
import { useOrderContext } from '@/hooks/use-order-context.js'
import { cn } from '@/lib/utils.js'
import RichEditor from '@/pages/components/RichEditor'
import type { I_ArticleProps } from '@/pages/types'
import { motion } from 'motion/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleView: React.FC<I_ArticleProps> = ({
  id,
  title,
  content,
  updated,
  className,
  i,
  ...props
}) => {
  const navigate = useNavigate()
  const { order } = useOrderContext()

  return (
    <motion.div
      className={cn(
        'flex flex-col justify-between gap-4 w-full h-full',
        className
      )}
      initial={'hidden'}
      whileInView={'visible'}
      viewport={{ once: true }}
      variants={{
        hidden: {
          opacity: 0,
          x: -10,
        },
        visible: {
          opacity: 1,
          x: 0,
        },
      }}
      transition={{
        duration: 0.5,
        ease: [0.15, 0.55, 0.55, 1],
        delay: Math.min((i ?? 0) * 0.1, 1),
      }}
      {...props}
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
    </motion.div>
  )
}

export default ArticleView

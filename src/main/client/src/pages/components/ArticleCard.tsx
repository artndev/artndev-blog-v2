import ArrowButton from '@/components/custom/arrow-button'
import { cn } from '@/lib/utils.js'
import type { I_ArticleProps } from '@/pages/types'
import { Calendar } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleCard: React.FC<I_ArticleProps> = ({
  id,
  title,
  content,
  updated,
  className,
  i,
  ...props
}) => {
  const navigate = useNavigate()

  return (
    <motion.div
      className={cn(`flex flex-col gap-4 w-full`, className)}
      initial={'hidden'}
      whileInView={'visible'}
      viewport={{ once: true }}
      variants={{
        hidden: {
          opacity: 0,
          y: 10,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.5,
        ease: [0.15, 0.55, 0.55, 1],
        delay: Math.min((i ?? 0) * 0.1, 1),
      }}
      {...props}
    >
      <div className="text-2xl font-semibold hanken-grotesk leading-none">
        {title}
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
    </motion.div>
  )
}

export default ArticleCard

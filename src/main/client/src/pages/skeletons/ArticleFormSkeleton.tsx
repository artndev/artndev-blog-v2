import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

const ArticleFormSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-4 w-full', className)}>
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-1/2 h-[30px]" />
      <Skeleton className="w-1/2 h-[30px]" />
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-1/2 h-[35px]" />
    </div>
  )
}

export default ArticleFormSkeleton

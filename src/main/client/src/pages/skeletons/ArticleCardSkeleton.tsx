import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

const ArticleCardSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn(`flex flex-col gap-4 w-full`, className)}>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/2 h-[40px]" />
        <Skeleton className="w-[50px] h-[20px] rounded-md" />
      </div>
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-1/2 h-[30px]" />
      <Skeleton className="self-end min-w-[200px] h-[35px] rounded-full" />
    </div>
  )
}

export default ArticleCardSkeleton

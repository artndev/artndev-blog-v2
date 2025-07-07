import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type React from 'react'

const ArticleViewSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        `flex flex-col justify-between gap-12 w-full h-full`,
        className
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-1/2 h-[40px]" />
          <Skeleton className="w-[50px] h-[20px] rounded-md" />
        </div>
        <Skeleton className="w-full h-[250px]" />
        <Skeleton className="w-1/2 h-[30px]" />
      </div>
      <div className="flex justify-end gap-6">
        <Skeleton className="flex-1 max-w-[200px] h-[35px] rounded-full" />
        <Skeleton className="flex-1 max-w-[200px] h-[35px] rounded-full" />
      </div>
    </div>
  )
}

export default ArticleViewSkeleton

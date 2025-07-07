import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type React from 'react'

const ArticleViewSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-4 w-full h-full',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-[40px]" />
        <Skeleton className="w-1/2 h-[30px]" />
        <Skeleton className="w-full h-[250px]" />
      </div>
      <div className="flex-1 flex flex-col justify-end gap-8">
        <div className="flex justify-between gap-6">
          <Skeleton className="flex-1 max-w-[200px] h-[30px]" />
          <Skeleton className="flex-1 max-w-[200px] h-[30px]" />
        </div>
      </div>
    </div>
  )
}

export default ArticleViewSkeleton

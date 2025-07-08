import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

const AdminPanelSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn(`flex flex-col gap-12 w-ful`, className)}>
      <div className="flex justify-between gap-3">
        <Skeleton className="flex-1 h-[30px]" />
        <Skeleton className="flex-1 h-[30px]" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-1/2 h-[40px]" />
        <div className="flex gap-3">
          <Skeleton className="w-[100px] h-[35px] rounded-full" />
          <Skeleton className="w-[100px] h-[35px] rounded-full" />
          <Skeleton className="w-[100px] h-[35px] rounded-full ml-auto" />
        </div>
      </div>
    </div>
  )
}

export default AdminPanelSkeleton

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

const AdminPanelSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn(`flex flex-col gap-12 w-ful`, className)}>
      <div className="flex justify-end gap-6">
        <Skeleton className="flex-1 max-w-[200px] h-[35px] rounded-full" />
        <Skeleton className="flex-1 max-w-[200px] h-[35px] rounded-full" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-1/2 h-[40px]" />
          <Skeleton className="w-[50px] h-[20px] rounded-md" />
        </div>
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

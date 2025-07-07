import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    /* changed rounded-md to rounded-sm */
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-sm', className)}
      {...props}
    />
  )
}

export { Skeleton }

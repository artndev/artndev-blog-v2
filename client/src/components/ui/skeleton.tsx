import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    /* changed rounded-md to rounded-sm and bg-accent to bg-(--skeleton)  */
    <div
      data-slot="skeleton"
      className={cn('bg-(--skeleton) animate-pulse rounded-sm', className)}
      {...props}
    />
  )
}

export { Skeleton }

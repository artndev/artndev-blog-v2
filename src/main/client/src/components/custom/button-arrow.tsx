import { Button } from '@/components/ui/button'
import React from 'react'
import type { I_ButtonArrowProps } from '@/components/types'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ButtonArrow: React.FC<I_ButtonArrowProps> = ({
  direction,
  content,
  className,
  ...props
}) => {
  return (
    <Button
      variant={'ghost'}
      className={cn(
        `
          w-[max-content] h-[max-content] text-muted-foreground p-0!
          hover:text-foreground active:text-foreground focus:text-foreground
        `,
        direction === 'left'
          ? 'hover:[&_.icon]:-translate-x-0.5 active:[&_.icon]:-translate-x-0.5'
          : 'hover:[&_.icon]:translate-x-0.5 active:[&_.icon]:translate-x-0.5',
        className
      )}
      {...props}
    >
      {direction === 'left' && (
        <ArrowLeft className="icon transition-transform duration-250" />
      )}
      {content}
      {direction === 'right' && (
        <ArrowRight className="icon transition-transform duration-250" />
      )}
    </Button>
  )
}

export default ButtonArrow

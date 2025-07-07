import { Button } from '@/components/ui/button'
import React from 'react'
import type { I_ButtonArrowProps } from '@/components/types'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ButtonArrow: React.FC<I_ButtonArrowProps> = ({
  content,
  direction,
  directionNode,
  variant,
  isExpanded,
  className,
  ...props
}) => {
  return (
    <Button
      variant={variant ?? 'ghost'}
      className={cn(
        'hover:text-foreground active:text-foreground focus:text-foreground',
        direction === 'left'
          ? 'hover:[&_.icon]:-translate-x-0.5 active:[&_.icon]:-translate-x-0.5'
          : 'hover:[&_.icon]:translate-x-0.5 active:[&_.icon]:translate-x-0.5',
        !isExpanded &&
          'w-[max-content] h-[max-content] text-muted-foreground p-0!',
        className
      )}
      {...props}
    >
      {!directionNode && direction === 'left' && (
        <ArrowLeft className="icon transition-transform duration-250" />
      )}
      {content}
      {!directionNode && direction === 'right' && (
        <ArrowRight className="icon transition-transform duration-250" />
      )}
      {directionNode}
    </Button>
  )
}

export default ButtonArrow

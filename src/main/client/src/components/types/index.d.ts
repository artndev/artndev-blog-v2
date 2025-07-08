export interface I_ButtonArrowProps extends React.ComponentProps<'button'> {
  content: string
  direction: 'left' | 'right'
  directionNode?: React.ReactNode
  variant?: 'ghost' | 'outline'
  isExpanded?: boolean
  className?: string
}

export {}

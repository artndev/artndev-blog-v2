import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const SPRING_CONFIG = { damping: 100, stiffness: 400 }

type MagneticButtonType = {
  children: React.ReactNode
  distance?: number
}

/* added className */
function MagneticButton({
  children,
  distance = 0.6,
  className,
}: MagneticButtonType & { className?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, SPRING_CONFIG)
  const springY = useSpring(y, SPRING_CONFIG)

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY

        if (isHovered) {
          x.set(distanceX * distance)
          y.set(distanceY * distance)

          /* integrated nice shadows */
          ref.current.classList.add('shadow-lg', 'shadow-foreground/15')
        } else {
          x.set(0)
          y.set(0)

          /* integrated nice shadows */
          ref.current.classList.remove('shadow-lg', 'shadow-foreground/15')
        }
      }
    }

    document.addEventListener('mousemove', calculateDistance)

    return () => {
      document.removeEventListener('mousemove', calculateDistance)
    }
  }, [ref, isHovered])

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        x: springX,
        y: springY,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton

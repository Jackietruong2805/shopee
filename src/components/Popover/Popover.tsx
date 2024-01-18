import { FloatingPortal, useFloating, FloatingArrow, arrow, shift, offset } from '@floating-ui/react'
import React, { useRef, useState, useId, type ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
}

export default function Popover({ children, className, renderPopover, as: Element = 'div', initialOpen }: Props) {
  const arrowRef = useRef<SVGSVGElement>(null)
  const [open, setOpen] = useState<boolean>(initialOpen || false)
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    middleware: [
      offset(2),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    transform: false
  })
  const id = useId()
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <AnimatePresence>
        {open && (
          <FloatingPortal id={id}>
            <motion.div
              ref={refs.setFloating}
              style={{ ...floatingStyles, transformOrigin: `${middlewareData.arrow?.x}px top` }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <FloatingArrow fill='white' ref={arrowRef} context={context} />
              {renderPopover}
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </Element>
  )
}

import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  element?: HTMLElement | null
}

export const Portal = (props: PortalProps) => {
  const {
    children,
    element = document.body,
  } = props

  const [target, setTarget] = useState<HTMLElement | null>(element)

  useEffect(() => {
    setTarget(element)
  }, [element])

  if (!target) return null

  return createPortal(children, target)
}

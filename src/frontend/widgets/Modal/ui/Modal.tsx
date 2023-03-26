import React, {
  ReactNode, useCallback, useEffect, useState,
} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Portal } from '@/shared/ui/Portal/Portal'
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
  lazy?: boolean
}

const ANIMATION_SPEED = 200

export const Modal = (props: ModalProps) => {
  const {
    className, children, isOpen, onClose, lazy = true,
  } = props

  const [isMounted, setIsMounted] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setTarget(document.getElementById('modals'))
  }, [])

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpened,
    [cls.opening]: isOpening,
    [cls.closing]: isClosing,
  }

  const onOpenHandler = useCallback(() => {
    setIsOpening(true)
    setTimeout(() => {
      setIsOpened(true)
      setIsOpening(false)
    }, ANIMATION_SPEED)
  }, [])

  const onCloseHandler = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsOpened(false)
      setIsClosing(false)
    }, ANIMATION_SPEED)
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      onOpenHandler()
    } else {
      setIsMounted(false)
    }
  }, [isOpen, onOpenHandler])

  const onEscDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onCloseHandler()
    }
  }, [isOpen, onCloseHandler])

  window.addEventListener('keydown', onEscDown)

  useEffect(() => () => {
    window.removeEventListener('keydown', onEscDown)
  }, [onEscDown])

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal element={target}>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={onCloseHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>

  )
}

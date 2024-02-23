import { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Portal } from '@/shared/ui/Portal'
import cls from './Modal.module.scss'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_SPEED = 200

export const Modal = (props: ModalProps) => {
  const {
    className, children, isOpen, onClose, lazy = true,
  } = props

  const {
    target,
    close,
    click,
    isClosing,
    isMounted,
    isOpened,
    isOpening,
  } = useModal({
    isOpen, onClose, animationDelay: ANIMATION_SPEED, targetId: 'modals',
  })

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpened,
    [cls.opening]: isOpening,
    [cls.closing]: isClosing,
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal element={target}>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={close}>
          <div className={cls.content} onClick={click}>
            {children}
          </div>
        </div>
      </div>
    </Portal>

  )
}

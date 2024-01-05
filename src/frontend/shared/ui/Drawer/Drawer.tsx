import { ReactNode, memo } from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import { Portal } from '@/shared/ui/Portal/Portal'
import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props

  const {
    target,
    close,
    isClosing,
    isOpened,
  } = useModal({
    isOpen, onClose, animationDelay: 300, targetId: 'modals',
  })

  const { theme } = useTheme()

  const mods: Mods = {
    [cls.opened]: isOpened,
    [cls.closing]: isClosing,
  }

  return (
    <Portal element={target}>
      <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />
        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>

  )
})

export { Drawer }

import { ReactNode, memo } from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import { Portal } from '@/shared/ui/Portal/Portal'
import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { useTheme } from '@/app/providers/ThemeProvider'

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

  const { theme } = useTheme()

  const mods: Mods = {
    [cls.opened]: isOpen,
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
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

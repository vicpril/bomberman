import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Popover } from '@/shared/ui/Popup'
import { Icon } from '@/shared/ui/Icon'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { NotificationList } from '@/entities/Notification'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { Drawer } from '@/shared/ui/Drawer'
import { BrowserView, MobileView } from '@/shared/lib/deviceDetect'
import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props

  const { flag: isDrawerOpen, on: openDrawer, off: closeDrawer } = useFlag(false)

  const onResizeHandler = useCallback((_isMobile: boolean) => {
    closeDrawer()
  }, [closeDrawer])

  const trigger = (
    <Button theme={ButtonTheme.Clear} onClick={openDrawer}>
      <Icon Svg={NotificationIcon} />
    </Button>
  )

  return (
    <>
      <MobileView onResizeCallback={onResizeHandler}>
        {trigger}
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
          <NotificationList className={cls.notifications} />
        </Drawer>
      </MobileView>
      <BrowserView onResizeCallback={onResizeHandler}>
        <Popover
          className={classNames('NotificationButton', {}, [className])}
          direction="bottom right"
          trigger={trigger}
        >
          <NotificationList className={classNames(cls.notifications, {}, [cls.popover])} />

        </Popover>
      </BrowserView>
    </>
  )
})

export { NotificationButton }

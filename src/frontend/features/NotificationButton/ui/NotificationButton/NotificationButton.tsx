import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import { Popover } from '@/shared/ui/Popup'
import { Icon } from '@/shared/ui/Icon/Icon'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { NotificationList } from '@/entities/Notification'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

interface NotificationButtonProps {
  className?: string
}

const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props

  return (
    <Popover
      className={classNames('NotificationButton', {}, [className])}
      direction="bottom right"
      trigger={(
        <Button theme={ButtonTheme.Clear}>
          <Icon Svg={NotificationIcon} />
        </Button>
      )}
    >
      <NotificationList className={cls.notifications} />
    </Popover>
  )
})

export { NotificationButton }

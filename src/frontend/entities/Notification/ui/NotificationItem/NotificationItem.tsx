import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card'
import { Text } from '@/shared/ui/Text'
import cls from './NotificationItem.module.scss'
import { Notification } from '../../model/types/Notification'

interface NotificationItemProps {
    className?: string;
    item: Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props

  const content = (
    <Card className={classNames(cls.Notification, {}, [className])}>
      <Text title={item.title} text={item.description} />
    </Card>
  )

  if (item.href) {
    return (
      <a target="_blank" href={item.href} rel="noreferrer" className={cls.link}>
        {content}
      </a>
    )
  }

  return content
})

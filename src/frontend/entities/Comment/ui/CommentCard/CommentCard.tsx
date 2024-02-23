import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'
import { Text } from '@/shared/ui/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import { AppLink } from '@/shared/ui/AppLink'
import { RoutePaths } from '@/shared/const/router'
import { HStack } from '@/shared/ui/Stack'
import { Comment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <HStack max gap="16">
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} />
        </HStack>
        <Skeleton className={cls.text} width="100%" height={50} />
      </div>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink className={cls.header} to={`${RoutePaths.profile}/${comment.user.id}`}>
        <HStack max gap="16">
          {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
          <Text title={comment.user.username} />
        </HStack>
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </div>
  )
})

export { CommentCard }

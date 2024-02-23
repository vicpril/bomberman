import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'
import { VStack } from '@/shared/ui/Stack'
import cls from './CommentList.module.scss'
import { Comment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props

  const { t } = useTranslation()

  if (isLoading) {
    return (
      <VStack
        gap="32"
        max
        className={classNames(cls.CommentList, {}, [className])}
      >
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    )
  }

  return (
    <VStack
      gap="32"
      max
      className={classNames(cls.CommentList, {}, [className])}
    >
      {
        comments?.length
          ? comments.map((comment, index) => (
            <CommentCard
              key={index}
              comment={comment}
              isLoading={isLoading}
            />
          ))
          : <Text title={t('Комментарии отсутствуют')} />
      }

    </VStack>

  )
})

export { CommentList }

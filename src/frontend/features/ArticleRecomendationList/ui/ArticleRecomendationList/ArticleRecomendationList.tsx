import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleRecomendationList.module.scss'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { ArticleList, ArticleView } from '@/entities/Article'
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi'
import { ArticleListItemSkeleton } from '@/entities/Article/ui/ArticleListItem/ArticleListItemSkeleton'

interface ArticleRecomendationListProps {
    className?: string;
}

export const ArticleRecomendationList = memo((props: ArticleRecomendationListProps) => {
  const { className } = props
  const { t } = useTranslation('articles')

  const { data: recomendations, isLoading, error } = useArticleRecommendationsList(3)

  if (error) {
    return (
      <Text title={t('Ошибка при загрузке списка рекоммендованных статей')} />
    )
  }

  const getSkeletons = () => new Array(4)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton key={index} view={ArticleView.SMALL} />
    ))

  if (isLoading || !recomendations) {
    return (
      <HStack gap="8">
        {getSkeletons()}
      </HStack>
    )
  }

  return (
    <VStack gap="8" className={classNames(cls.ArticleRecomendationList, {}, [className])}>
      <Text
        size={TextSize.M}
        title={t('Рекоммендованные статьи')}
      />
      <ArticleList
        articles={recomendations}
        isLoading={isLoading}
        inline
        target="_blank"
      />
    </VStack>
  )
})

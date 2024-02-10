import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesDetailPage.module.scss'
import { ArticleDetails } from '@/entities/Article'
import {
  getArticleDetailsIsLoading,
} from '@/entities/Article/model/selectors/getArticleDetails/getArticleDetails'
import { Page } from '@/widgets/Page/Page'
import { ArticlesDetailPageHeader } from '../ArticlesDetailPageHeader/ArticlesDetailPageHeader'
import { VStack } from '@/shared/ui/Stack'
import { ArticleRecomendationList } from '@/features/ArticleRecomendationList'
import { ArticleCommentsList } from '@/features/ArticleCommentsList'
import { ArticleRating } from '@/features/ArticleRating'

interface ArticlesDetailPageProps {
  className?: string
}

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props

  const { id } = useParams<{id: string}>()

  const { t } = useTranslation('articles')

  const isLoading = useSelector(getArticleDetailsIsLoading)

  if (!id) {
    return (
      <div className={classNames(cls.ArticlesDetailPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>

    )
  }

  return (
    <Page
      className={classNames(cls.ArticlesDetailPage, {}, [className])}
      saveScroll
    >
      <VStack gap="32" max>

        <ArticlesDetailPageHeader />
        <ArticleDetails id={id} />
        {!isLoading
          && (
            <>
              <ArticleRating articleId={id} className={cls.rating} />
              <ArticleRecomendationList />
              <ArticleCommentsList articleId={id} />
            </>
          )}
      </VStack>
    </Page>

  )
}

export default ArticlesDetailPage

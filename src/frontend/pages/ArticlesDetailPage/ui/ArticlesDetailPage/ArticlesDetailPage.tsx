import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleDetails, getArticleDetailsIsLoading } from '@/entities/Article'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import { ArticleCommentsList } from '@/features/ArticleCommentsList'
import { ArticleRating } from '@/features/ArticleRating'
import { toggleFeature } from '@/shared/lib/features'
import { Card } from '@/shared/ui/Card'
import { ArticlesDetailPageHeader } from '../ArticlesDetailPageHeader/ArticlesDetailPageHeader'
import cls from './ArticlesDetailPage.module.scss'

interface ArticlesDetailPageProps {
    className?: string
}

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
    const { className } = props

    const { id } = useParams<{ id: string }>()

    const { t } = useTranslation('articles')

    const isLoading = useSelector(getArticleDetailsIsLoading)

    if (!id) {
        return (
            <div className={classNames(cls.ArticlesDetailPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        )
    }

    const ratingBlock = toggleFeature({
        name: 'isArticleRatingEnabled',
        on: () => <ArticleRating articleId={id} className={cls.rating} />,
        off: () => <Card>{t('Рейтинг статей появится в будущем')}</Card>,
    })

    return (
        <Page className={classNames(cls.ArticlesDetailPage, {}, [className])} saveScroll>
            <VStack gap="32" max>
                <ArticlesDetailPageHeader />
                <ArticleDetails id={id} />
                {!isLoading && (
                    <>
                        {/* {isArticleRatingEnabled && <ArticleRating articleId={id} className={cls.rating} />} */}
                        {ratingBlock}
                        <ArticleCommentsList articleId={id} />
                    </>
                )}
            </VStack>
        </Page>
    )
}

export default ArticlesDetailPage

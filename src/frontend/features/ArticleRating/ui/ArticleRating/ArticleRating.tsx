import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RatingCard } from '@/entities/Rating'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating = (props: ArticleRatingProps) => {
    const { className, articleId } = props

    const { t } = useTranslation()

    const userData = useSelector(getUserAuthData)

    const { data, isLoading } = useGetArticleRating({
        userId: userData?.id ?? '',
        articleId,
    })

    // rate
    const [rateArticle] = useRateArticle()

    const onAcceptHandler = (starsCount: number, feedback?: string) => {
        rateArticle({
            articleId,
            userId: userData?.id ?? '',
            rate: starsCount,
            feedback,
        })
    }
    const onCancelHandler = (starsCount: number) => {
        rateArticle({
            articleId,
            userId: userData?.id ?? '',
            rate: starsCount,
        })
    }

    if (isLoading) {
        return <Skeleton width="100%" height={120} />
    }

    const rating = data?.[0]

    return (
        <div className={className}>
            <RatingCard
                title={rating?.rate ? t('Ваша оценка') : t('Оцените статью')}
                rate={rating?.rate}
                onAccept={onAcceptHandler}
                onCancel={onCancelHandler}
                hasFeedback
                responsive
            />
        </div>
    )
}

export default ArticleRating

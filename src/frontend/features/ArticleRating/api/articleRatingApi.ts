import { Rating } from '@/entities/Rating'
import { rtkApiJson } from '@/shared/api/rtkApi'

interface GetArticleRatingsArgs {
    userId: string
    articleId: string
}
interface RateArticleArgs {
    userId: string
    articleId: string
    rate: number
    feedback?: string
}

const articleRatingApi = rtkApiJson.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRatingsArgs>({
            query: ({ userId, articleId }) => ({
                url: '/articles-rating',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArgs>({
            query: (args) => ({
                url: '/articles-rating',
                method: 'POST',
                body: args,
            }),
        }),
    }),
    overrideExisting: false,
})

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation

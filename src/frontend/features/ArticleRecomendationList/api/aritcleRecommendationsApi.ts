import { Article } from '@/entities/Article'
import { rtkApiJson } from '@/shared/api/rtkApi'

const recommendationApi = rtkApiJson.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
    overrideExisting: false,
})

export const useArticleRecommendationsList = recommendationApi.useGetArticleRecommendationsListQuery

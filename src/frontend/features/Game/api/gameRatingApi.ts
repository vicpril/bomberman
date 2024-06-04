import { rtkApi } from '@/shared/api/rtkApi'
import { GameRating } from '../types'

interface GetGameRatingsArgs {}

interface RateGameArgs {
    rate: number
    win: boolean
    feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getGameRating: build.query<GameRating, GetGameRatingsArgs>({
            query: () => ({
                url: '/game/current-rating',
            }),
        }),
        rateGame: build.mutation<void, RateGameArgs>({
            query: (args) => ({
                url: '/game/ratings',
                method: 'POST',
                body: args,
            }),
        }),
    }),
    overrideExisting: false,
})

export const useGetGameRating = articleRatingApi.useGetGameRatingQuery
export const useRateGame = articleRatingApi.useRateGameMutation

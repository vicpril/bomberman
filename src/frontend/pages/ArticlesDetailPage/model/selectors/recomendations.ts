import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleDetailsReccomendationsIsLoading = (state: StateSchema) => {
  return state.articleDetailsPage?.recomendations.isLoading ?? false
}

export const getArticleDetailsReccomendationsError = (state: StateSchema) => {
  return state.articleDetailsPage?.recomendations.error
}

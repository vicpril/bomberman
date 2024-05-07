import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleDetailsData = ({ articleDetails }: StateSchema) => articleDetails?.data
export const getArticleDetailsIsLoading = ({ articleDetails }: StateSchema) =>
    articleDetails?.isLoading ?? false
export const getArticleDetailsError = ({ articleDetails }: StateSchema) => articleDetails?.error

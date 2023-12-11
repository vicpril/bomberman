import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleCommentsIsLoading = (state: StateSchema) => {
  return state.articleCommentsList?.isLoading || false
}
export const getArticleCommentsError = (state: StateSchema) => {
  return state.articleCommentsList?.error
}

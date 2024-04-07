import { StateSchema } from '@/app/providers/StoreProvider'
import { ArticleView } from '@/entities/Article'
import { buildSelector } from '@/shared/lib/store'

export const [useArticlesPageIsLoading, getArticlesPageIsLoading] = buildSelector(
  (state: StateSchema) => state.articlesPage?.isLoading ?? false,
)
export const [useArticlesPageError, getArticlesPageError] = buildSelector(
  (state: StateSchema) => state.articlesPage?.error,
)
export const [useArticlesPageView, getArticlesPageView] = buildSelector(
  (state: StateSchema) => state.articlesPage?.view ?? ArticleView.SMALL,
)
export const [useArticlesPageHasMore, getArticlesPageHasMore] = buildSelector(
  (state: StateSchema) => state.articlesPage?.hasMore ?? true,
)
export const [useArticlesPageNum, getArticlesPageNum] = buildSelector(
  (state: StateSchema) => state.articlesPage?.page || 1,
)
export const [useArticlesPageLimit, getArticlesPageLimit] = buildSelector(
  (state: StateSchema) => state.articlesPage?.limit || 9,
)
export const [useArticlesPageInited, getArticlesPageInited] = buildSelector(
  (state: StateSchema) => state.articlesPage?._inited || false,
)

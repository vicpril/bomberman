import { StateSchema } from '@/app/providers/StoreProvider'
import { ArticleType } from '@/entities/Article'
import { SelectOption } from '@/shared/ui/Select'
import { ArticleSortProps, ArticleSortPropsLabels } from '../types/articlesFilters'

export const getArticlesFilterOrder = (state: StateSchema) => state.articleFilters?.order ?? 'desc'
export const getArticlesFilterSort = (state: StateSchema) => state.articleFilters?.sort
  ?? ArticleSortProps.CREATED_AT
export const getArticlesFilterSearch = (state: StateSchema) => state.articleFilters?.search ?? ''
export const getArticlesFilterType = (state: StateSchema) => state.articleFilters?.type
  ?? ArticleType.ALL

export const articlesPropsOptions: SelectOption<ArticleSortProps>[] = Object.values(ArticleSortProps)
  .map((prop) => ({
    label: ArticleSortPropsLabels[prop],
    value: prop,
  }))

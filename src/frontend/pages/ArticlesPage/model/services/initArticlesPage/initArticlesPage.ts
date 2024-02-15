import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import {
  getArticlesPageInited,
} from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { SortOrder } from '@/shared/types'
import type { ArticleSortProps } from '@/features/ArticlesFilters'
import { articleFiltersActions } from '@/features/ArticlesFilters'
import { ArticleType } from '@/entities/Article'

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams | void,
    ThunkConfig<string>
    >(
      'articlesPage/initArticlesPage',
      async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi

        const inited = getArticlesPageInited(getState())

        if (!inited) {
          const orderFromUrl = searchParams?.get('order') as SortOrder
          const sortFromUrl = searchParams?.get('sort') as ArticleSortProps
          const searchFromUrl = searchParams?.get('search')
          const typeFromUrl = searchParams?.get('type') as ArticleType

          if (orderFromUrl) {
            dispatch(articleFiltersActions.setOrder(orderFromUrl))
          }
          if (sortFromUrl) {
            dispatch(articleFiltersActions.setSort(sortFromUrl))
          }
          if (searchFromUrl) {
            dispatch(articleFiltersActions.setSearch(searchFromUrl))
          }
          if (typeFromUrl) {
            dispatch(articleFiltersActions.setType(typeFromUrl))
          }

          dispatch(articlesPageActions.initView())
          dispatch(fetchArticlesList({ replace: true }))
        }
      },
    )

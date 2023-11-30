import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import { getArticlesPageLimit, getArticlesPageNum } from '../../selectors/articlesPageSelectors'
import {
  getArticlesFilterOrder,
  getArticlesFilterSearch,
  getArticlesFilterSort,
  getArticlesFilterType,
} from '@/features/ArticlesFilters/model/selectors/articlesFiltersSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { ArticleType } from '@/entities/Article/model/types/article'
import { addQueryParams } from '@/shared/lib/url/addQueryParams'

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps | undefined,
  ThunkConfig<string>>(
    'articles/fetchArticlesList',
    async (_props, thunkApi) => {
      const {
        extra, rejectWithValue, getState, dispatch,
      } = thunkApi

      const page = getArticlesPageNum(getState())
      const limit = getArticlesPageLimit(getState())
      const order = getArticlesFilterOrder(getState())
      const sort = getArticlesFilterSort(getState())
      const search = getArticlesFilterSearch(getState())
      const type = getArticlesFilterType(getState())

      try {
        addQueryParams({
          sort, order, search, type,
        })
        const response = await extra.apiJson.get<Article[]>('/articles', {
          params: {
            _page: page,
            _limit: limit,
            _expand: 'user',
            _order: order,
            _sort: sort,
            type: type === ArticleType.ALL ? undefined : type,
            q: search,
          },
        })

        dispatch(articlesPageActions.setHasMore(response.data.length >= limit))

        return response.data
      } catch (error) {
        if (axios.isAxiosError<string>(error)) {
          return rejectWithValue(error.response?.data || 'Something wrong')
        }
        return rejectWithValue('Something wrong')
      }
    },
  )

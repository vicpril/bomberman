import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors'

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
  'articles/fetchArticlesList',
  async ({ page }, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi

    const limit = getArticlesPageLimit(getState())
    console.log('🚀 ~ limit:', limit)

    try {
      const response = await extra.apiJson.get<Article[]>('/articles', {
        params: {
          _page: page,
          _limit: limit,
          _expand: 'user',
        },
      })

      return response.data
    } catch (error) {
      if (axios.isAxiosError<string>(error)) {
        return rejectWithValue(error.response?.data || 'Something wrong')
      }
      return rejectWithValue('Something wrong')
    }
  },
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'

export const fetchArticleRecomendations = createAsyncThunk<Article[], void, ThunkConfig<string>
>(
  'articles/fetchArticleRecomendations',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
      const response = await extra.apiJson.get<Article[]>('/articles', {
        params: {
          _limit: 4,
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

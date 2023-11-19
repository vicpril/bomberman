import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Article } from '../../types/article'
import { ThunkConfig } from '@/app/providers/StoreProvider'

export const fetchArticleDetailsById = createAsyncThunk<
  Article,
  number,
  ThunkConfig<string>
>(
  'articles/fetchArticleDetailsById',
  async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
      const response = await extra.apiJson.get(`articles/${articleId}`)

      return response.data
    } catch (error) {
      if (axios.isAxiosError<string>(error)) {
        return rejectWithValue(error.response?.data ?? 'Something wrong')
      }
      return rejectWithValue('Something wrong')
    }
  },
)

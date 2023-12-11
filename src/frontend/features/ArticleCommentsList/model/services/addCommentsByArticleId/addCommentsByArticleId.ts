import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article/model/selectors/getArticleDetails/getArticleDetails'
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addCommentsByArticleId = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>>(
    'articles/addCommentByArticleId',
    async (text, thunkApi) => {
      const {
        extra, rejectWithValue, getState, dispatch,
      } = thunkApi

      const user = getUserAuthData(getState())
      const article = getArticleDetailsData(getState())

      if (!article || !user || !text) {
        return rejectWithValue('No data')
      }

      try {
        const response = await extra.apiJson.post<Comment>('/comments', {
          articleId: article.id,
          userId: user.id,
          text,
        })

        if (!response.data) {
          throw new Error()
        }

        dispatch(fetchCommentsByArticleId(article.id))

        return response.data
      } catch (error) {
        if (axios.isAxiosError<string>(error)) {
          return rejectWithValue(error.response?.data || 'Something wrong')
        }
        return rejectWithValue('Something wrong')
      }
    },
  )

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
    'articles/fetchCommentsByArticleId',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        if (!articleId) {
            return rejectWithValue('No articleId')
        }

        try {
            const response = await extra.apiJson.get<Comment[]>('/comments', {
                params: {
                    articleId,
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

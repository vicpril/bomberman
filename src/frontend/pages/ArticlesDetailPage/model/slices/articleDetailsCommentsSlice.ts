import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Comment } from '@/entities/Comment'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'
import { StateSchema } from '@/app/providers/StoreProvider'

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
)

const articleDetailsCommentsSlice = createSlice({
  name: 'ArticleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    error: undefined,
    isLoading: false,
    entities: {},
    ids: [],

  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByArticleId.pending, (state) => {
      state.isLoading = true
      state.error = undefined
    })
    builder.addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = undefined
      commentsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice

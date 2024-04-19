import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Comment } from '@/entities/Comment'
import { StateSchema } from '@/app/providers/StoreProvider'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { ArticleCommentsListSchema } from '../types/ArticleCommentsListSchema'

const commentsAdapter = createEntityAdapter<Comment, string>({
  selectId: (comment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleCommentsList || commentsAdapter.getInitialState(),
)

const articleCommentsListSlice = createSlice({
  name: 'ArticleCommentsListSlice',
  initialState: commentsAdapter.getInitialState<ArticleCommentsListSchema>({
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

export const { reducer: articleCommentsListReducer } = articleCommentsListSlice

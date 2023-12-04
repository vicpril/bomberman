import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import { Article } from '@/entities/Article'
import { fetchArticleRecomendations } from '../services/fetchArticleRecomendations/fetchArticleRecomendations'
import { ArticleDetailsRecomendationsSchema } from '../types/ArticleDetailsRecomendationsSchema'

const recomendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

export const getArticleRecomendations = recomendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recomendations || recomendationsAdapter.getInitialState(),
)

const articleDetailsRecomendationsSlice = createSlice({
  name: 'articleDetails/articleDetailsRecomendationsSlice',
  initialState: recomendationsAdapter.getInitialState<ArticleDetailsRecomendationsSchema>({
    error: undefined,
    isLoading: false,
    entities: {},
    ids: [],

  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleRecomendations.pending, (state) => {
      state.isLoading = true
      state.error = undefined
    })
    builder.addCase(fetchArticleRecomendations.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = undefined
      recomendationsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchArticleRecomendations.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { reducer: articleDetailsRecomendationsReducer } = articleDetailsRecomendationsSlice

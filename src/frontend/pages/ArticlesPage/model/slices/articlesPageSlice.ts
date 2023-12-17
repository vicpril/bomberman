import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import { Article, ArticleView } from '@/entities/Article'
import { ArticlesPageSchema } from '../types/ArticlesPageSchema'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
)

const articlesPageSlice = createSlice({
  name: 'articlesPageSlices',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    entities: {},
    ids: [],
    view: ArticleView.SMALL,
    error: undefined,
    isLoading: false,
    hasMore: true,
    page: 1,
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    },
    initView: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView ?? ArticleView.SMALL
      state.view = view
      state.limit = view === ArticleView.SMALL ? 9 : 3
      state._inited = true
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchArticlesList.pending, (state, action) => {
      state.isLoading = true
      state.error = undefined
      if (action.meta.arg?.replace) {
        articlesAdapter.setAll(state, [])
      }
    })
    builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = undefined
      if (action.meta.arg?.replace) {
        articlesAdapter.setAll(state, action.payload)
      } else {
        articlesAdapter.addMany(state, action.payload)
      }
      state.hasMore = action.payload.length >= Number(state.limit)
    })
    builder.addCase(fetchArticlesList.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { actions: articlesPageActions } = articlesPageSlice
export const { reducer: articlesPageReducer } = articlesPageSlice

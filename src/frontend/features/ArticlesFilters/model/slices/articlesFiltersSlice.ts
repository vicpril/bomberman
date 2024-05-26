import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleType } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'
import { ArticleFiltersSchema, ArticleSortProps } from '../types/articlesFilters'

const initialState: ArticleFiltersSchema = {
    order: 'desc',
    sort: ArticleSortProps.CREATED_AT,
    search: '',
    type: ArticleType.ALL,
}

const articlesFiltersSlice = createSlice({
    name: 'articles/articlesFiltersSlice',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setSort: (state, action: PayloadAction<ArticleSortProps>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload
        },
    },
})

export const { reducer: articleFiltersReducer } = articlesFiltersSlice
export const { actions: articleFiltersActions } = articlesFiltersSlice

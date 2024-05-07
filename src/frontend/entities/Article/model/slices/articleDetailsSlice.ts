import { createSlice } from '@reduxjs/toolkit'
import { ArticleDetailsSchema } from '../types/articleDetailsSchema'
import { fetchArticleDetailsById } from '../services/fetchArticleDetailsById/fetchArticleDetailsById'

const initialState: ArticleDetailsSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
}

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchArticleDetailsById.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchArticleDetailsById.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = undefined
            state.data = action.payload
        })
        builder.addCase(fetchArticleDetailsById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
            state.data = undefined
        })
    },
})

export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice

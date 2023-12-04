import { combineReducers } from '@reduxjs/toolkit'
import { articleDetailsRecomendationsReducer } from './articleDetailsRecomendationsSlice'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'
import { ArticleDetailsPageSchema } from '../types'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  comments: articleDetailsCommentsReducer,
  recomendations: articleDetailsRecomendationsReducer,
})

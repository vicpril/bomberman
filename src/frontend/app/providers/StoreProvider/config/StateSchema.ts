// import { EnhancedStore } from '@reduxjs/toolkit'
// import { AxiosInstance } from 'axios'
// import { NavigateFunction } from 'react-router-dom'
// import type { CounterSchema } from '@/entities/Counter'
// import { ProfileSchema } from '@/entities/Profile'
// import type { UserSchema } from '@/entities/User'
import type { LoginSchema } from '@/features/AuthByUsername'
import { UserSchema } from '@/entities/User'
import { ProfileSchema } from '@/entities/Profile'
import { ProfileUpdateSchema } from '@/features/ProfileEdit'
import { ArticleDetailsSchema } from '@/entities/Article'
import { ArticleDetailsCommentsSchema } from '@/pages/ArticlesDetailPage'
import { AddCommentFormSchema } from '@/features/AddCommentForm'
import { ArticlesPageSchema } from '@/pages/ArticlesPage'
import { UISchema } from '@/features/UI'
import { ArticleFiltersSchema } from '@/features/ArticlesFilters'

export interface StateSchema {
  user: UserSchema,
  ui: UISchema,

  // асинхронные
  loginForm?: LoginSchema
  profile?: ProfileSchema
  profileUpdate?: ProfileUpdateSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: ArticleDetailsCommentsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
  articleFilters?: ArticleFiltersSchema
}

export type StateSchemaKey = keyof StateSchema

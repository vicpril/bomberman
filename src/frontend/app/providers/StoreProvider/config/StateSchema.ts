import type { LoginSchema } from '@/features/AuthByUsername'
import { UserSchema } from '@/entities/User'
import { ProfileSchema } from '@/entities/Profile'
import { ProfileUpdateSchema } from '@/features/ProfileEdit'
import { ArticleDetailsSchema } from '@/entities/Article'
import { AddCommentFormSchema } from '@/widgets/AddCommentForm'
import { ArticlesPageSchema } from '@/pages/ArticlesPage'
import { UISchema } from '@/features/UI'
import { ArticleFiltersSchema } from '@/features/ArticlesFilters'
import { rtkApiJson } from '@/shared/api/rtkApi'
import { ArticleCommentsListSchema } from '@/features/ArticleCommentsList'

export interface StateSchema {
    user: UserSchema
    ui: UISchema
    [rtkApiJson.reducerPath]: ReturnType<(typeof rtkApiJson)['reducer']>

    // асинхронные
    loginForm?: LoginSchema
    profile?: ProfileSchema
    profileUpdate?: ProfileUpdateSchema
    articleDetails?: ArticleDetailsSchema
    addCommentForm?: AddCommentFormSchema
    articlesPage?: ArticlesPageSchema
    articleFilters?: ArticleFiltersSchema
    articleCommentsList?: ArticleCommentsListSchema
}

export type StateSchemaKey = keyof StateSchema

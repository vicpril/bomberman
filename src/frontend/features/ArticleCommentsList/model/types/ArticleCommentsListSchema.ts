import { EntityState } from '@reduxjs/toolkit'
import { Comment } from '@/entities/Comment'

export interface ArticleCommentsListSchema extends EntityState<Comment, string> {
    isLoading?: boolean
    error?: string
}

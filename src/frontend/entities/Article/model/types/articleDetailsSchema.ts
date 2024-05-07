import { Article } from './article'

export interface ArticleDetailsSchema {
    isLoading: boolean
    data?: Article
    error?: string
}

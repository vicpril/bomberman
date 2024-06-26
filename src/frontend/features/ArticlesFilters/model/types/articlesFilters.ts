import { ArticleType } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'

export enum ArticleSortProps {
    VIEWS = 'views',
    CREATED_AT = 'created_at',
    TITLE = 'title',
}

export const ArticleSortPropsLabels: Record<ArticleSortProps, string> = {
    [ArticleSortProps.VIEWS]: 'Количеству просмотров',
    [ArticleSortProps.CREATED_AT]: 'Дате создания',
    [ArticleSortProps.TITLE]: 'Названию',
}

export interface ArticleFiltersSchema {
    type?: ArticleType
    search?: string
    order: SortOrder
    sort: ArticleSortProps
}

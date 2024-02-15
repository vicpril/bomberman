export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'

export type { Article } from './model/types/article'

export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export {
  ArticleView, ArticleType, ArticleBlockType, articleTypeOptions,
} from './model/consts'

export { ArticleList } from './ui/ArticleList/ArticleList'
export { ArticleListItemSkeleton } from './ui/ArticleListItem/ArticleListItemSkeleton'

export { ArticlesViewSelector } from './ui/ArticlesViewSelector/ArticlesViewSelector'
export {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from './model/selectors/getArticleDetails/getArticleDetails'

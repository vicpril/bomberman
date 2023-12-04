import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema'
import { ArticleDetailsRecomendationsSchema } from './ArticleDetailsRecomendationsSchema'

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema,
  recomendations: ArticleDetailsRecomendationsSchema
}

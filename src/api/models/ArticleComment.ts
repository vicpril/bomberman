import {
  AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table,
} from 'sequelize-typescript'
import { User } from './User'
import { Article } from './Article'

@Table({
  tableName: 'article_comments',
  timestamps: true,
})
export class ArticleComment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number

  @Column(DataType.TEXT)
    body: string

  @ForeignKey(() => User)
  @Column
    userId!: number

  @BelongsTo(() => User, 'userId')
    owner!: Awaited<User>

  @ForeignKey(() => Article)
  @Column
    articleId!: number

  @BelongsTo(() => Article, 'articleId')
    article!: Awaited<Article>
}

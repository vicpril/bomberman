import {
  AllowNull,
  AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table,
} from 'sequelize-typescript'
import { Article } from './Article'

export enum ArticleBlockTypes {
  Code = 'CODE',
  Text = 'TEXT',
  Image = 'IMAGE',
}

@Table({
  tableName: 'article_blocks',
  timestamps: false,
})
export class ArticleBlock extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number

  @Default(ArticleBlockTypes.Text)
  @Column(DataType.ENUM(...Object.values(ArticleBlockTypes)))
    type: ArticleBlockTypes

  @AllowNull
  @Column(DataType.JSON)
    content: JSON

  @ForeignKey(() => Article)
  @Column
    articleId!: number

  @BelongsTo(() => Article, 'articleId')
    article!: Awaited<Article>
}

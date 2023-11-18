import {
  Table, Model, PrimaryKey, Column, DataType, AutoIncrement, HasMany, BelongsTo, ForeignKey,
} from 'sequelize-typescript'
import { User } from './User'
import { ArticleBlock } from './ArtricleBlock'
import { ArticleComment } from './ArticleComment'

@Table({
  tableName: 'articles',
  timestamps: true,
})
export class Article extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number

  @Column
    title!: string

  @Column
    subtitle: string

  @Column
    img: string

  @Column
    views: number

  @Column(DataType.ARRAY(DataType.STRING))
    type: string[]

  @HasMany(() => ArticleBlock, {
    foreignKey: 'articleId',
    onDelete: 'CASCADE',
  })
    blocks!: Awaited<ArticleBlock[]>

  @ForeignKey(() => User)
  @Column
    userId!: number

  @BelongsTo(() => User, 'userId')
    owner!: Awaited<User>

  @HasMany(() => ArticleComment, {
    foreignKey: 'articleId',
    onDelete: 'CASCADE',
  })
    comments!: Awaited<ArticleComment[]>
}

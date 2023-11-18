import { UserMeta } from 'api/models/UserMeta'
import {
  Table, Model, PrimaryKey, Column, DataType, Unique, HasOne, AutoIncrement, Default,
} from 'sequelize-typescript'
// import { Article } from './Article'
// import { ArticleComment } from './ArticleComment'

export enum UserRoles {
  Admin = 'ADMIN',
  User = 'USER'
}

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number

  @Unique
  @Column
    username!: string

  @Column
    password!: string

  @Default(UserRoles.User)
  @Column(DataType.ENUM(...Object.values(UserRoles)))
    role: UserRoles

  @HasOne(() => UserMeta, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
    meta!: Awaited<UserMeta>

  get profile() {
    return {
      ...this.meta.get(),
      username: this.username,
      id: this.id,
    }
  }

  // @HasMany(() => Article, 'userId')
  //   articles!: Awaited<Article[]>

  // @HasMany(() => ArticleComment, 'articleId')
  //   articleComments: Awaited<ArticleComment[]>
}

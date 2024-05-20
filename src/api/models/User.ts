import { UserMeta } from 'api/models/UserMeta'
import {
    Table,
    Model,
    PrimaryKey,
    Column,
    DataType,
    Unique,
    HasOne,
    AutoIncrement,
    Default,
} from 'sequelize-typescript'
import { Token } from './Token'
// import { Article } from './Article'
// import { ArticleComment } from './ArticleComment'

export enum UserRoles {
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    User = 'USER',
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

    @Default([UserRoles.User])
    // @Column(DataType.ENUM(...Object.values(UserRoles)))
    //   role: UserRoles
    @Column(DataType.ARRAY(DataType.ENUM(...Object.values(UserRoles))))
    roles: UserRoles[]

    @HasOne(() => UserMeta, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    })
    meta!: Awaited<UserMeta>

    @HasOne(() => Token, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    })
    refreshToken!: Awaited<Token>

    get isAdmin() {
        return this.roles.includes(UserRoles.Admin)
    }

    get isManager() {
        return this.roles.includes(UserRoles.Manager)
    }

    get profile() {
        return {
            ...this.meta.get(),
            username: this.username,
            id: this.id,
        }
    }

    get dtoFull() {
        return {
            ...this.meta.get(),
            roles: this.roles,
            username: this.username,
            id: this.id,
        }
    }

    get dtoShort() {
        return {
            roles: this.roles,
            firstname: this.meta.firstname,
            lastname: this.meta.lastname,
            username: this.username,
            id: this.id,
        }
    }

    // @HasMany(() => Article, 'userId')
    //   articles!: Awaited<Article[]>

    // @HasMany(() => ArticleComment, 'articleId')
    //   articleComments: Awaited<ArticleComment[]>
}

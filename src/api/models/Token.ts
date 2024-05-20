import { Table, Model, Column, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './User'

@Table({
    tableName: 'tokens',
    timestamps: false,
})
export class Token extends Model {
    @PrimaryKey
    @Column
    refreshToken!: string

    @ForeignKey(() => User)
    @Column
    userId!: number

    @BelongsTo(() => User, 'userId')
    user!: Awaited<User>
}

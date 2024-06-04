import {
    Table,
    Model,
    Column,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    AutoIncrement,
    DataType,
    AllowNull,
} from 'sequelize-typescript'
import { User } from './User'

@Table({
    tableName: 'game-ratings',
    timestamps: true,
})
export class GameRatings extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number

    @AllowNull
    @ForeignKey(() => User)
    @Column({ defaultValue: null, type: DataType.INTEGER })
    userId!: number | null

    @BelongsTo(() => User, 'userId')
    user!: Awaited<User>

    @Column({ defaultValue: true })
    win!: boolean

    @Column(DataType.INTEGER)
    rate!: number

    @Column({ defaultValue: '' })
    feedback!: string
}

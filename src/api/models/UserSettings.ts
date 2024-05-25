import {
    Table,
    Model,
    PrimaryKey,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    Default,
} from 'sequelize-typescript'
import { User } from './User'

@Table({
    tableName: 'usersettings',
    timestamps: false,
})
export class UserSettings extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId!: number

    @BelongsTo(() => User, 'userId')
    user!: Awaited<User>

    @Default({})
    @Column(DataType.JSON)
    data: object
}

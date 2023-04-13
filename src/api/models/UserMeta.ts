import {
  Table, Model, PrimaryKey, Column, DataType, Default, AllowNull, BelongsTo, ForeignKey, AutoIncrement,
} from 'sequelize-typescript'
import { User } from './User'

@Table({
  tableName: 'usermeta',
  timestamps: true,
})
export class UserMeta extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number

  @Column
    firstname!: string

  @Column
    lastname!: string

  @Default(null)
  @Column(DataType.INTEGER)
    age: number | null = null

  @AllowNull
  @Default(null)
  @Column
    currency: string = ''

  @Column
    country: string = ''

  @Column
    city: string = ''

  @Column
    avatar: string = ''

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
    userId!: number

  @BelongsTo(() => User)
    user!: User
}

import { UserMeta } from 'api/models/UserMeta'
import {
  Table, Model, PrimaryKey, Column, DataType, Unique, HasOne, AutoIncrement,
} from 'sequelize-typescript'

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

  @HasOne(() => UserMeta)
  public meta!: Awaited<UserMeta>
}

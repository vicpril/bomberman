import { User } from 'api/models/User'
import { UserMeta } from 'api/models/UserMeta'
import { BaseRESTService } from 'api/services/BaseRESTService'

export type UserServiceFields = Pick<User, 'username' | 'password'> & Omit<UserMeta, 'id'>

export class UsersService implements BaseRESTService<User> {
  public static get = () => User.findAll({ include: UserMeta })

  public static getById = (id: number) => User.findByPk(id, { include: UserMeta })

  public static getByUsername = (username: string) => User.findOne({
    where: { username },
    include: UserMeta,
  })

  public static create = async (args: UserServiceFields) => {
    const { username, password, ...usermetaFields } = args
    const user = User.create({
      username,
      password,
      meta: usermetaFields,
    }, {
      include: [
        UserMeta,
      ],
    })

    return user
  }
}

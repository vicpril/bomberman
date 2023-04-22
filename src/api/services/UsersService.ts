import { User } from 'api/models/User'
import { UserMeta } from 'api/models/UserMeta'
import { BaseRESTService } from 'api/services/BaseRESTService'

interface Options {
  withMeta?: boolean
}

export type UserServiceFields = Pick<User, 'username' | 'password'> & Omit<UserMeta, 'id'>

export class UsersService implements BaseRESTService<User> {
  public static get = (options?: Options) => User.findAll(options?.withMeta ? { include: UserMeta } : {})

  public static getById = (id: number, options?: Options) => User.findByPk(
    id,
    options?.withMeta ? { include: UserMeta } : {},
  )

  public static getByUsername = (username: string, options?: Options) => User.findOne({
    where: { username },
    include: options?.withMeta ? UserMeta : undefined,
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

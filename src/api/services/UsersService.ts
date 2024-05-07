import { User } from 'api/models/User'
import { UserMeta } from 'api/models/UserMeta'
import { BaseRESTService } from 'api/services/BaseRESTService'

interface Options {
    withMeta?: boolean
}

export type UserServiceFields = Pick<User, 'username' | 'password'> & Omit<UserMeta, 'id'>

export type UpdateUserProfileFields = Omit<UserMeta, 'id'>

export class UsersService implements BaseRESTService<User> {
    public static get = (options?: Options) => User.findAll(options?.withMeta ? { include: UserMeta } : {})

    public static getById = (id: number, options?: Options) =>
        User.findByPk(id, options?.withMeta ? { include: UserMeta } : {})

    public static getByUsername = (username: string, options?: Options) =>
        User.findOne({
            where: { username },
            include: options?.withMeta ? UserMeta : undefined,
        })

    public static create = async (args: UserServiceFields) => {
        const { username, password, ...usermetaFields } = args
        const user = User.create(
            {
                username,
                password,
                meta: usermetaFields,
            },
            {
                include: [UserMeta],
            },
        )

        return user
    }

    public static updateProfile = async (id: number, args: UpdateUserProfileFields) => {
        const { ...usermetaFields } = args

        const user = await User.findByPk(id, { include: UserMeta })

        if (!user) throw new Error(`User with id: ${id} doesn't exist`)

        await user.meta.update(usermetaFields)

        return user
    }
}

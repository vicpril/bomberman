import { User, UserRoles } from 'api/models/User'
import { UserMeta } from 'api/models/UserMeta'
import { TransactionService, TransactionServiceOptions } from './TransactionService'

interface Options {
    withMeta?: boolean
}

export type UserServiceFields = Pick<User, 'username' | 'password'> & Omit<UserMeta, 'id'>

export type UpdateUserProfileFields = Omit<UserMeta, 'id'>

export class UserService {
    public static create = async (
        args: Partial<UserServiceFields> & Required<Pick<UserServiceFields, 'username' | 'password'>>,
        options?: TransactionServiceOptions,
    ) => {
        const { username, password, ...usermetaFields } = args

        return TransactionService(async (t) => {
            const roles: UserRoles[] = [UserRoles.User]
            if (username.toLocaleLowerCase() === 'admin') roles.push(UserRoles.Admin)
            if (username.toLocaleLowerCase() === 'manager') roles.push(UserRoles.Manager)

            const newUser = await User.create(
                {
                    username,
                    password,
                    roles,
                },
                { transaction: t },
            )
            await UserMeta.create(
                {
                    ...usermetaFields,
                    userId: newUser.id,
                },
                { transaction: t },
            )

            const user = await User.findByPk(newUser.id, { include: UserMeta, transaction: t })
            if (!user) {
                throw new Error('Error on create user')
            }

            return user
        }, options)
    }

    /**
     * OLD services
     */

    public static get = (options?: Options) => User.findAll(options?.withMeta ? { include: UserMeta } : {})

    public static getById = (id: number, options?: Options) =>
        User.findByPk(id, options?.withMeta ? { include: UserMeta } : {})

    public static getByUsername = (username: string, options?: Options) =>
        User.findOne({
            where: { username },
            include: options?.withMeta ? UserMeta : undefined,
        })

    public static updateProfile = async (id: number, args: UpdateUserProfileFields) => {
        const { ...usermetaFields } = args

        const user = await User.findByPk(id, { include: UserMeta })

        if (!user) throw new Error(`User with id: ${id} doesn't exist`)

        await user.meta.update(usermetaFields)

        return user
    }

    public static delete = async (id: number) => {
        const user = await User.findByPk(id, { include: UserMeta })

        if (!user) throw new Error(`User with id: ${id} doesn't exist`)

        await user.destroy()

        return user
    }
}

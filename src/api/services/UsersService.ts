import { sequelize } from '@api/models'
import { User, UserRoles } from 'api/models/User'
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

    public static create = async (
        args: Partial<UserServiceFields> & Required<Pick<UserServiceFields, 'username' | 'password'>>,
    ) => {
        const { username, password, ...usermetaFields } = args

        const t = await sequelize.transaction()

        const roles: UserRoles[] = [UserRoles.User]
        if (username.toLocaleLowerCase() === 'admin') roles.push(UserRoles.Admin)
        if (username.toLocaleLowerCase() === 'manager') roles.push(UserRoles.Manager)

        try {
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
            await t.commit()

            return User.findByPk(newUser.id, { include: UserMeta })
        } catch (error) {
            await t.rollback()
            throw error
        }
    }

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

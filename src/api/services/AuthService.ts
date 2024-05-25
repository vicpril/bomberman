import { User } from '@api/models/User'
import bcrypt from 'bcrypt'
import { ApiError } from '@api/exceptions/ApiError'
import { ApiErrorCode } from '@api/config/ApiErrorCodes'
import { UserMeta } from '@api/models/UserMeta'
import { Request } from 'express'
import { FeatureFlags } from '@api/models/FeatureFlags'
import { UserSettings } from '@api/models/UserSettings'
import { UserService, UserServiceFields } from './UserService'
import { TokenService } from './TokenService'
import { TransactionService } from './TransactionService'

export class AuthService {
    public static async registration(
        args: Partial<UserServiceFields> & Required<Pick<UserServiceFields, 'username' | 'password'>>,
    ) {
        return TransactionService(async (t) => {
            const candidate = await User.findOne({ where: { username: args.username } })
            if (candidate) {
                throw ApiError.BadRequest(ApiErrorCode.REGISTRATION_USERNAME_EXISTS)
            }

            const hashPassword = await bcrypt.hash(args.password, 3)

            const user = await UserService.create({ ...args, password: hashPassword }, { transaction: t })

            const tokens = TokenService.generateTokens({ ...user.dtoShort })

            await TokenService.saveToken(user.id, tokens.refreshToken, { transaction: t })

            return { ...tokens, user: user.dtoFull }
        })
    }

    public static login = async (args: Pick<User, 'username' | 'password'>) => {
        const user = await User.findOne({ where: { username: args.username }, include: UserMeta })
        if (!user) {
            throw ApiError.BadRequest(ApiErrorCode.LOGIN_WRONG_CREDENTIALS)
        }

        const isPassEquals = await bcrypt.compare(args.password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest(ApiErrorCode.LOGIN_WRONG_CREDENTIALS)
        }

        const tokens = TokenService.generateTokens({ ...user.dtoShort })

        await TokenService.saveToken(user.id, tokens.refreshToken)

        return { ...tokens, user: user.dtoFull }
    }

    public static async logout(refreshToken: string) {
        const destroyed = await TokenService.removeToken(refreshToken)
        return destroyed
    }

    public static async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await TokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findByPk(userData.id, { include: UserMeta })
        if (!user) {
            throw ApiError.UnauthorizedError()
        }

        const tokens = TokenService.generateTokens({ ...user.dtoShort })

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokenFromDB.refreshToken,
            user: user.dtoFull,
        }
    }

    public static async profile(userId: number) {
        const user = await User.findByPk(userId, { include: [UserMeta, FeatureFlags, UserSettings] })
        return user?.dtoFull
    }

    public static getCurrentUser = async (request: Request, withMeta = false) => {
        const accessToken = request.headers.authorization?.split(' ')[1] ?? null

        if (!accessToken) return null

        const userData = TokenService.validateAccessToken(accessToken)

        if (!userData) return null

        const currentUser = await User.findByPk(userData.id, withMeta ? { include: UserMeta } : {})

        return currentUser
    }
}

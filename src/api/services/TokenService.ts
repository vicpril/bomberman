import { Token } from '@api/models/Token'
import { User } from '@api/models/User'
import jwt from 'jsonwebtoken'
import { TransactionService, TransactionServiceOptions } from './TransactionService'

type TokensPayload = User['dtoShort']

type UserJwtPayload = jwt.JwtPayload & TokensPayload

export class TokenService {
    public static generateTokens(payload: TokensPayload) {
        const accessToken = jwt.sign({ ...payload }, process.env.JWT_ACCESS_SECRET ?? '', {
            expiresIn: '30m',
        })
        const refreshToken = jwt.sign({ ...payload }, process.env.JWT_REFRESH_SECRET ?? '', {
            expiresIn: '30d',
        })

        return {
            accessToken,
            refreshToken,
        }
    }

    public static async saveToken(userId: number, refreshToken: string, options?: TransactionServiceOptions) {
        return TransactionService(async (t) => {
            const tokenData = await Token.findOne({ where: { userId }, transaction: t })
            if (tokenData) {
                const newToken = await Token.update({ refreshToken }, { where: { userId }, transaction: t })
                return newToken
            }
            const newToken = await Token.create({ userId, refreshToken }, { transaction: t })
            return newToken
        }, options)
    }

    public static validateAccessToken(token: string) {
        try {
            const userData = <UserJwtPayload>jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? '')
            return userData
        } catch (error) {
            return null
        }
    }

    public static validateRefreshToken(token: string) {
        try {
            const userData = <UserJwtPayload>jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? '')
            return userData
        } catch (error) {
            return null
        }
    }

    public static async removeToken(token: string) {
        const destroyed = await Token.destroy({ where: { refreshToken: token } })
        return destroyed
    }

    public static findToken(token: string) {
        return Token.findByPk(token)
    }
}

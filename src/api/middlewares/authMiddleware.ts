import { NextFunction, Request, Response } from 'express'
import { TokenService } from '@api/services/TokenService'
import { ApiError } from '../exceptions/ApiError'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accesstoken = authorizationHeader.split(' ')[1]
        if (!accesstoken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = TokenService.validateAccessToken(accesstoken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.currentUserId = userData.id
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}

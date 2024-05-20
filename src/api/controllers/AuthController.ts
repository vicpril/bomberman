import { ApiErrorCode } from '@api/config/ApiErrorCodes'
import { ApiError } from '@api/exceptions/ApiError'
import { AuthService } from '@api/services/AuthService'
import { UserService } from 'api/services/UserService'
import { Response, Request, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export class AuthController {
    public static registeration = [
        body('username').trim().notEmpty().withMessage(ApiErrorCode.REGISTRATION_USERNAME_REQUIRED),
        body('password').trim().notEmpty().withMessage(ApiErrorCode.REGISTRATION_PASSWORD_REQUIRED),

        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return next(ApiError.BadRequestWithValidator(ApiErrorCode.BAD_REQUEST, errors.array()))
                }

                const respData = await AuthService.registration(req.body)

                res.cookie('refreshToken', respData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                })

                return res.send(respData)
            } catch (error) {
                next(error)
            }
        },
    ]

    public static login = [
        body('username').trim().notEmpty().withMessage(ApiErrorCode.REGISTRATION_USERNAME_REQUIRED),
        body('password')
            .trim()
            .notEmpty()
            .withMessage(ApiErrorCode.REGISTRATION_PASSWORD_REQUIRED)
            .trim()
            .isLength({ min: 3 })
            .withMessage('password should be greater then 3'),

        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return next(ApiError.BadRequestWithValidator(ApiErrorCode.BAD_REQUEST, errors.array()))
                }

                const userData = await AuthService.login(req.body)

                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                })

                res.json(userData)
            } catch (error) {
                next(error)
            }
        },
    ]

    public static getProfile = async (req: Request, res: Response) => {
        try {
            const user = await UserService.getById(+req.params.id, {
                withMeta: true,
            })
            if (!user) {
                res.status(404).send('User not found')
            } else {
                res.send(user.profile)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }

    public static logout = [
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { refreshToken } = req.cookies
                if (refreshToken) {
                    await AuthService.logout(refreshToken ?? '')
                    res.clearCookie('refreshToken')
                    return res.send('OK')
                }
                return res.send('OK')
            } catch (error) {
                next(error)
            }
        },
    ]

    public static refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies
            const userData = await AuthService.refresh(refreshToken)
            // res.clearCookie('refreshToken')
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json(userData)
        } catch (error) {
            res.clearCookie('refreshToken')
            next(error)
        }
    }

    public static profile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { currentUserId } = req
            if (!currentUserId) {
                throw ApiError.UnauthorizedError()
            }
            const userData = await AuthService.profile(currentUserId)
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

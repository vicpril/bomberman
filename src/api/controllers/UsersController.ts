import { ApiErrorCode } from '@api/config/ApiErrorCodes'
import { ApiError } from '@api/exceptions/ApiError'
import { AuthService } from '@api/services/AuthService'
import { UserService } from 'api/services/UserService'
import { Response, Request, NextFunction } from 'express'
import { CustomValidator, body, param, validationResult } from 'express-validator'

const isUserExists: CustomValidator = async (id: string) => {
    const user = await UserService.getById(+id)
    if (!user) throw new Error(`User with id '${id}' doesn't exist`)
    return true
}

export class UsersController {
    public static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await UserService.get()
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    public static getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await UserService.getById(+req.params.id, {
                withMeta: true,
            })
            if (!user) {
                throw ApiError.NotFound(ApiErrorCode.USER_NOT_FOUND)
            }

            const currentUser = await AuthService.getCurrentUser(req)

            if (currentUser?.isAdmin || currentUser?.id === user.id) {
                return res.json(user.dtoFull)
            }
            return res.json(user.dtoShort)
        } catch (error) {
            next(error)
        }
    }

    public static updateProfile = [
        param('id').custom(isUserExists),
        body('firstname').trim().notEmpty().withMessage(ApiErrorCode.PROFILE_EDIT_INCORRECT_FIRATNAME),
        body('lastname').trim().notEmpty().withMessage(ApiErrorCode.PROFILE_EDIT_INCORRECT_LASTNAME),
        body('age').trim().isNumeric().optional({ nullable: true }).toInt(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    throw ApiError.BadRequestWithValidator(ApiErrorCode.BAD_REQUEST, errors.array())
                }

                const result = await UserService.updateProfile(+req.params.id, req.body)
                res.send(result.profile)
            } catch (error) {
                next(error)
            }
        },
    ]

    public static delete = [
        async (req: Request, res: Response, next: NextFunction) => {
            const { id } = req.params // Getting the ID from the URL params
            // Checking if the ID is a number
            if (!Number.isInteger(+id)) {
                throw ApiError.NotFound(ApiErrorCode.USER_NOT_FOUND)
            }

            try {
                const user = await UserService.delete(+id)

                return res.send(user)
            } catch (error) {
                next(error)
            }
        },
    ]
}

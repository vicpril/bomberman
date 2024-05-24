import { ApiErrorCode } from '@api/config/ApiErrorCodes'
import { ApiError } from '@api/exceptions/ApiError'
import { FeatureFlags } from '@api/models/FeatureFlags'
import { User } from '@api/models/User'
import { AuthService } from '@api/services/AuthService'
import { Response, Request, NextFunction } from 'express'
import { param, validationResult } from 'express-validator'

export class FeatureFlagsController {
    public static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = await AuthService.getCurrentUser(req)
            const onlyOwn = currentUser && !currentUser?.isAdmin && !currentUser.isManager
            const result = await FeatureFlags.findAll({
                where: onlyOwn ? { userId: currentUser.id } : {},
                include: {
                    model: User,
                    attributes: ['id', 'username'],
                },
            })
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    public static update = [
        param('userId').isNumeric(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    throw ApiError.BadRequestWithValidator(ApiErrorCode.BAD_REQUEST, errors.array())
                }

                const currentUser = await AuthService.getCurrentUser(req)

                if (!currentUser?.isAdmin) {
                    throw ApiError.Forbidden()
                }

                const ff = await FeatureFlags.findByPk(+req.params.userId, {
                    attributes: { include: ['userId'] },
                    include: {
                        model: User,
                        attributes: ['id', 'username'],
                    },
                })

                if (!ff) throw ApiError.NotFound()

                await ff.update(req.body)

                res.json(ff)
            } catch (error) {
                next(error)
            }
        },
    ]
}

import { ApiErrorCode } from '@api/config/ApiErrorCodes'
import { ApiError } from '@api/exceptions/ApiError'
import { GameRatings } from '@api/models/GameRatings'
import { AuthService } from '@api/services/AuthService'
import { Response, Request, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { Sequelize } from 'sequelize-typescript'

export class GameRatingsController {
    public static getCurrentRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const [{ rate, count }] = await GameRatings.findAll({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('GameRatings.rate')), 'rate'],
                    [Sequelize.fn('count', Sequelize.col('GameRatings.rate')), 'count'],
                ],
                raw: true,
            })

            const result = { count: Number(count), rating: Number(rate).toFixed(2) }
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    public static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await GameRatings.findAll()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    public static rate = [
        body('rate').notEmpty().isInt({ min: 0, max: 5 }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    throw ApiError.BadRequestWithValidator(ApiErrorCode.BAD_REQUEST, errors.array())
                }

                const currentUser = await AuthService.getCurrentUser(req)

                const result = await GameRatings.create({
                    userId: currentUser?.id ?? null,
                    win: Boolean(req.body.win),
                    rate: req.body.rate ?? 5,
                    feedback: req.body.feedback ?? '',
                })

                res.json(result)
            } catch (error) {
                next(error)
            }
        },
    ]
}

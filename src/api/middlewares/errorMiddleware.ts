import { NextFunction, Request, Response } from 'express'
import { API_ERROR_MESSAGE } from '@api/config/ApiErrorCodes'
import { ApiError } from '../exceptions/ApiError'

export const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.warn(err)
    if (err instanceof ApiError) {
        return res.status(err.status).json(err.getJson())
    }
    return res.status(500).json({ code: 'SERVER_ERROR', message: API_ERROR_MESSAGE.SERVER_ERROR })
}

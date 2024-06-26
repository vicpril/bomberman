import { Request, Response } from 'express'
import { ValidationError, validationResult } from 'express-validator'

export const bodyErrorsFormatter = ({ msg }: ValidationError) => msg

export const validateRequestBody = (req: Request, res: Response) => {
    const errors = validationResult(req).formatWith(bodyErrorsFormatter)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.mapped() })
        return false
    }
    return true
}

export const validateAsString = (req: Request, res: Response) => {
    const errors = validationResult(req).formatWith(bodyErrorsFormatter)
    if (!errors.isEmpty()) {
        res.status(400).send(Object.values(errors.mapped())[0])
        return false
    }
    return true
}

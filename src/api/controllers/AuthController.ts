import { validateAsString } from 'api/helpers/validate'
import { UsersService } from 'api/services/UsersService'
import { Response, Request } from 'express'
import { body } from 'express-validator'

export class AuthController {
    public static login = [
        body('username').trim().notEmpty().withMessage('username is required'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('password is required')
            .trim()
            .isLength({ min: 3 })
            .withMessage('password should be greater then 3'),

        async (req: Request, res: Response) => {
            if (!validateAsString(req, res)) return

            try {
                const user = await UsersService.getByUsername(req.body.username)

                if (user?.password !== req.body.password) {
                    res.status(400).send('Username or password is incorrect')
                    return
                }

                res.send(user)
            } catch (error) {
                console.error(error)
                res.status(500).send(error)
            }
        },
    ]
}

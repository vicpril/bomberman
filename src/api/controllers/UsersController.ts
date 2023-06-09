import { validateRequestBody } from 'api/helpers/validate'
import { UsersService } from 'api/services/UsersService'
import { Response, Request } from 'express'
import { CustomValidator, body, param } from 'express-validator'

const isUsernameUnique: CustomValidator = async (username: string) => {
  const user = await UsersService.getByUsername(username)
  if (user) throw new Error(`User with username '${username}' already exists`)
  return true
}

const isUserExists: CustomValidator = async (id: string) => {
  const user = await UsersService.getById(+id)
  if (!user) throw new Error(`User with id '${id}' doesn't exist`)
  return true
}

export class UsersController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const result = await UsersService.get()
      res.send(result)
    } catch (error) {
      res
        .status(500)
        .send(error)
    }
  }

  public static create = [
    body('username')
      .trim().notEmpty().withMessage('username is required')
      .custom(isUsernameUnique),
    body('password')
      .trim().notEmpty().withMessage('password is required')
      .trim()
      .isLength({ min: 3 })
      .withMessage('password should be greater then 3'),
    body('firstname')
      .trim().notEmpty().withMessage('firstname is required'),
    body('lastname')
      .trim().notEmpty().withMessage('lastname is required'),
    async (req: Request, res: Response) => {
      if (!validateRequestBody(req, res)) return

      try {
        const result = await UsersService.create(req.body)
        res.send(result)
      } catch (error) {
        console.error(error)
        res
          .status(500)
          .send(error)
      }
    },
  ]

  public static getProfile = async (req: Request, res: Response) => {
    try {
      const user = await UsersService.getById(+req.params.id, { withMeta: true })
      // console.log('🚀 ~ UsersController ~ user', user)
      if (!user) {
        res.status(404).send('User not found')
      } else {
        res.send(user.profile)
      }
    } catch (error) {
      res
        .status(500)
        .send(error)
    }
  }

  public static updateProfile = [
    param('id').custom(isUserExists),
    body('firstname')
      .trim().notEmpty().withMessage('firstname is required'),
    body('lastname')
      .trim().notEmpty().withMessage('lastname is required'),
    body('age')
      .trim().isNumeric().optional({ nullable: true })
      .toInt(),
    async (req: Request, res: Response) => {
      if (!validateRequestBody(req, res)) return

      try {
        const result = await UsersService.updateProfile(+req.params.id, req.body)
        res.send(result.profile)
      } catch (error) {
        console.error(error)
        res
          .status(500)
          .send(error)
      }
    },
  ]
}

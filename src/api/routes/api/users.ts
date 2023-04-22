import { UsersController } from 'api/controllers/UsersController'
import { Router } from 'express'

const usersRouter: Router = Router()

usersRouter.get('/', UsersController.getAll)
// usersRouter.get('/', (req, res) => {
//   res.send('users!!!')
// })

usersRouter.post('/', UsersController.create)

usersRouter.get('/:id/', UsersController.getProfile)

export default usersRouter

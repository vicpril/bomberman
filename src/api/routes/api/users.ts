import { UsersController } from 'api/controllers/UsersController'
import { Router } from 'express'

const usersRouter: Router = Router()

usersRouter.get('/', UsersController.getAll)
// usersRouter.get('/', (req, res) => {
//   res.send('users!!!')
// })

usersRouter.post('/', UsersController.create)

usersRouter.get('/:id/', UsersController.getProfile)

usersRouter.put('/:id/', UsersController.updateProfile)

usersRouter.delete('/:id/', UsersController.delete)

export default usersRouter

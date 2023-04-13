import { UsersController } from 'api/controllers/UsersController'
import usersRouter from 'api/routes/api/users'
import { Router } from 'express'

export const initApiRoutes = (router: Router) => {
  const apiRouter: Router = Router()

  apiRouter.use('/users', usersRouter)

  apiRouter.use('/profile', UsersController.getProfile)

  router.use('/api/v1', apiRouter)

  router.all(['/api/*'], (_, resp) => {
    resp.status(404).send('API no found')
  })
}

import { UsersController } from 'api/controllers/UsersController'
import { Router } from 'express'
import usersRouter from './users'
import authRoutes from './auth'

export const initApiRoutes = (router: Router) => {
  const apiRouter: Router = Router()

  apiRouter.use('/', authRoutes)

  apiRouter.use('/users', usersRouter)

  apiRouter.use('/profile', UsersController.getProfile)

  router.use('/api/v1', apiRouter)

  router.all(['/api/*'], (_, resp) => {
    resp.status(404).send('API no found')
  })
}

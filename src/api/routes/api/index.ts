import { Router } from 'express'
import usersRouter from './users'
import authRoutes from './auth'

export const initApiRoutes = (router: Router) => {
    const apiRouter: Router = Router()

    apiRouter.use('/', authRoutes)

    apiRouter.use('/users', usersRouter)

    router.use('/api/v1', apiRouter)

    router.all(['/api/*'], (_, resp) => {
        resp.status(404).send('API no found')
    })
}

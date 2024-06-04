import { Router } from 'express'
import { authMiddleware } from '@api/middlewares/authMiddleware'
import usersRouter from './users'
import authRoutes from './auth'
import featureFlagsRouter from './features'
import gameRatingsRoutes from './game-ratings'

export const initApiRoutes = (router: Router) => {
    const apiRouter: Router = Router()

    apiRouter.use('/', authRoutes)

    apiRouter.use('/users', usersRouter)

    apiRouter.use('/features', authMiddleware, featureFlagsRouter)

    apiRouter.use('/game', gameRatingsRoutes)

    router.use('/api/v1', apiRouter)

    router.all(['/api/*'], (_, resp) => {
        resp.status(404).send('API no found')
    })
}

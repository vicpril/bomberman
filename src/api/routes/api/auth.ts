import { AuthController } from '@api/controllers/AuthController'
import { authMiddleware } from '@api/middlewares/authMiddleware'
import { Router } from 'express'

const authRoutes: Router = Router()

authRoutes.post('/login', AuthController.login)
authRoutes.post('/logout', AuthController.logout)
authRoutes.post('/registration', AuthController.registeration)
authRoutes.get('/refresh', AuthController.refresh)
authRoutes.get('/profile', authMiddleware, AuthController.profile)

export default authRoutes

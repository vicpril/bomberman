import { AuthController } from '@api/controllers/AuthController'
import { Router } from 'express'

const authRoutes: Router = Router()

authRoutes.post('/login/', AuthController.login)

// authRoutes.post('logout/', UsersController.create)

export default authRoutes

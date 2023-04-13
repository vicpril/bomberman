import { initApiRoutes } from 'api/routes/api'
import { Router } from 'express'

const router = Router()

initApiRoutes(router)

export default router

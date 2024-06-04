import { GameRatingsController } from '@api/controllers/GameRatingsController'
import { Router } from 'express'

const gameRatingsRoutes: Router = Router()

gameRatingsRoutes.get('/ratings', GameRatingsController.getAll)
gameRatingsRoutes.post('/ratings', GameRatingsController.rate)
gameRatingsRoutes.get('/current-rating', GameRatingsController.getCurrentRating)

export default gameRatingsRoutes

import { FeatureFlagsController } from 'api/controllers/FeatureFlagsController'
import { Router } from 'express'

const featureFlagsRouter: Router = Router()

featureFlagsRouter.get('/', FeatureFlagsController.getAll)

featureFlagsRouter.put('/:userId/', FeatureFlagsController.update)

export default featureFlagsRouter

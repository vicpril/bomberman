import { StateSchema } from '../../StoreProvider'

export type AppRouteGuard = (state: StateSchema) => boolean

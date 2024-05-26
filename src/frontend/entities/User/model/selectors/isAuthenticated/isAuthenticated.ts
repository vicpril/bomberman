import { StateSchema } from '@/app/providers/StoreProvider'
import { buildSelector } from '@/shared/lib/store'

export const [useIsAuthenticated, isAuthenticated] = buildSelector(
    (state: StateSchema) => !!state.user.authData?.id,
)

import { StateSchema } from '@/app/providers/StoreProvider'
import { UserRoles } from '@/shared/const/UserRoles'

export const allowRoles = (roles: UserRoles[]) => (state: StateSchema) => {
    if (!state.user.authData) {
        return false
    }
    return roles.some((role) => !!state.user.authData?.roles?.includes(role))
}

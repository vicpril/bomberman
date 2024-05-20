import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import { UserRoles } from '@/shared/const/UserRoles'

const getUserRoles = (state: StateSchema): UserRoles[] => state.user.authData?.roles ?? []

export const isUserAdmin = (state: StateSchema) => getUserRoles(state).includes(UserRoles.ADMIN)
export const isUserManager = (state: StateSchema) => getUserRoles(state).includes(UserRoles.MANAGER)

export const allowRoles = (roles: UserRoles[]) =>
    createSelector(getUserRoles, (userRoles) => {
        return roles.some((role) => userRoles.includes(role))
    })

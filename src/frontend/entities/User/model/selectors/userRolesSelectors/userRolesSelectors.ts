import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import { UserRoles } from '@/shared/const/UserRoles'

const getUserRoles = (state: StateSchema): UserRoles[] => state.user.authData?.roles ?? []

export const isUserAdmin = createSelector(getUserRoles, (roles) => roles.includes(UserRoles.ADMIN))
export const isUserManager = createSelector(getUserRoles, (roles) => roles.includes(UserRoles.MANAGER))

export const allowRoles = (roles: UserRoles[]) =>
    createSelector(getUserRoles, (userRoles) => {
        return roles.some((role) => userRoles.includes(role))
    })

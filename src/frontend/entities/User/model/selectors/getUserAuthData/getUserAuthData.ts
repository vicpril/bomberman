import { StateSchema } from '@/app/providers/StoreProvider'
import { buildSelector } from '@/shared/lib/store'
import { createSelector } from '@reduxjs/toolkit'

export const getUserAuthData = (state: StateSchema) => state.user.authData

export const [useUserId, getUserId] = buildSelector(
    createSelector(getUserAuthData, (data) => data?.id ?? null),
)

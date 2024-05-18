import { createSelector } from '@reduxjs/toolkit'
import { isAuthenticated } from '../isAuthenticated/isAuthenticated'

export const isNotAuthenticated = createSelector(isAuthenticated, (isAuth) => !isAuth)

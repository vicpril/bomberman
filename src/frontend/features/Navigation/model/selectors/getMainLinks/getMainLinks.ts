import { createSelector } from '@reduxjs/toolkit'
import { isAuthenticated, isUserAdmin, isUserManager } from '@/entities/User'
import { notEmpty } from '@/shared/lib/helpers/notEmpty'
import { getNavigationItem } from '../getNavigationItem/getNavigationItem'

export const getMainLinks = createSelector(
    [getNavigationItem, isAuthenticated, isUserAdmin, isUserManager],
    (NavigationItem, isAuth, isUserAdmin, isUserManager) => {
        return [
            NavigationItem.game,
            isAuth && NavigationItem.profile,
            NavigationItem.articles,
            !isAuth && NavigationItem.registration,
            (isUserAdmin || isUserManager) && NavigationItem.adminPanel,
        ].filter(notEmpty)
    },
)

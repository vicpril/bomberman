import { createSelector } from '@reduxjs/toolkit'
import { isAuthenticated } from '@/entities/User'
import { notEmpty } from '@/shared/lib/helpers/notEmpty'
import { getNavigationItem } from '../getNavigationItem/getNavigationItem'
import { NavigationLink } from '../../types'

export const getNavbarLinks = createSelector(
    [getNavigationItem, isAuthenticated],
    (NavigationItem, isAuth): NavigationLink[] => {
        return [
            NavigationItem.main,
            NavigationItem.game,
            isAuth && NavigationItem.profile,
            NavigationItem.articles,
        ].filter(notEmpty)
    },
)

import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { GetRoutePaths } from '@/shared/const/router'
import { NavbarItemType } from '../../types/NavbarItems'

export const getNavLinks = createSelector(getUserAuthData, (state): NavbarItemType[] => {
    const links: NavbarItemType[] = [
        {
            path: GetRoutePaths.main(),
            text: 'Главная',
        },
        {
            path: GetRoutePaths.game(),
            text: 'Играть',
        },
        {
            path: GetRoutePaths.profile(state?.id ?? ''),
            text: 'Профиль',
            auth: true,
        },
        {
            path: GetRoutePaths.articles(),
            text: 'Статьи',
            auth: false,
        },
    ]

    return state ? links : links.filter((l) => !l.auth)
})

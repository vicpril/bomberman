import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { GetRoutePaths } from '@/shared/const/router'
import { NavbarItemType } from '../../types/NavbarItems'

const whenAuth = (link: NavbarItemType) => !link.onlyNotAuth
const whenNotAuth = (link: NavbarItemType) => !link.onlyAuth

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
            onlyAuth: true,
        },
        {
            path: GetRoutePaths.articles(),
            text: 'Статьи',
        },
        {
            path: GetRoutePaths.registration(),
            text: 'Регистрация',
            onlyNotAuth: true,
        },
    ]

    return state ? links.filter(whenAuth) : links.filter(whenNotAuth)
})

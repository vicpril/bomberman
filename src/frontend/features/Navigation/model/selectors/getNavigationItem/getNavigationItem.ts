import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { AppRoutes, GetRoutePaths } from '@/shared/const/router'

export const getNavigationItem = createSelector(getUserAuthData, (authData) => {
    return {
        [AppRoutes.Main]: {
            path: GetRoutePaths.main(),
            text: 'Главная',
        },
        [AppRoutes.Game]: {
            path: GetRoutePaths.game(),
            text: 'Играть',
        },
        [AppRoutes.Profile]: {
            path: GetRoutePaths.profile(authData?.id ?? ''),
            text: 'Профиль',
        },
        [AppRoutes.Articles]: {
            path: GetRoutePaths.articles(),
            text: 'Статьи',
        },
        [AppRoutes.Registration]: {
            path: GetRoutePaths.registration(),
            text: 'Зарегистрироваться',
        },
        [AppRoutes.AdminPanel]: {
            path: GetRoutePaths.adminPanel(),
            text: 'Админка',
        },
    }
})

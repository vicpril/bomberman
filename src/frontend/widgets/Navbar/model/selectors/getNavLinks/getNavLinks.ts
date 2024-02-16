import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { RoutePaths } from '@/shared/const/router'
import { NavbarItemType } from '../../types/NavbarItems'

export const getNavLinks = createSelector(
  getUserAuthData,
  (state): NavbarItemType[] => {
    const links: NavbarItemType[] = [
      {
        path: RoutePaths.main,
        text: 'Главная',
      },
      {
        path: RoutePaths.game,
        text: 'Играть',
      },
      {
        path: `${RoutePaths.profile}/${state?.id}`,
        text: 'Профиль',
        auth: true,
      },
      {
        path: RoutePaths.articles,
        text: 'Статьи',
        auth: false,
      },
    ]

    return state
      ? links
      : links.filter((l) => !l.auth)
  },
)

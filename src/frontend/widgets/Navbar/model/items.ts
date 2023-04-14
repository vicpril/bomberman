import { RoutePaths } from '@/shared/config/routerConfig'

export interface NavbarItemType {
  path: string,
  text: string,
}

export const NavbarLinks: NavbarItemType[] = [
  {
    path: RoutePaths.main,
    text: 'Главная',
  },
  {
    path: RoutePaths.profile,
    text: 'Профиль',
  },
  {
    path: RoutePaths.game,
    text: 'Игра',
  },
]

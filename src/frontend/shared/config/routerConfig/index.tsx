import { RouteProps } from 'react-router-dom'
// import { AboutPage } from '@/pages/AboutPage'
import { MainPage } from '@/pages/MainPage'
// import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { GamePage } from '@/pages/GamePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export enum AppRoutes {
  Main = 'main',
  Game = 'game',
  // About = 'about',
  Profile = 'profile',
  NotFound = 'notFound'
}

export type AppRoutesProps = RouteProps & {
  authRequired?: boolean
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.Game]: '/game',
  // [AppRoutes.About]: '/about',
  [AppRoutes.Profile]: '/profile',
  [AppRoutes.NotFound]: '/*',
}

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.Main]: {
    element: <MainPage />,
    path: RoutePaths.main,
  },
  [AppRoutes.Game]: {
    element: <GamePage />,
    path: RoutePaths.game,
  },
  // [AppRoutes.About]: {
  //   element: <AboutPage />,
  //   path: RoutePaths.about,
  // },
  [AppRoutes.Profile]: {
    element: <ProfilePage />,
    path: RoutePaths.profile,
    authRequired: true,
  },
  [AppRoutes.NotFound]: {
    element: <NotFoundPage />,
    path: RoutePaths.notFound,
  },
}

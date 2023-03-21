import { RouteProps } from 'react-router-dom'
// import { AboutPage } from '@/pages/AboutPage'
import { MainPage } from '@/pages/MainPage'
// import { NotFoundPage } from '@/pages/NotFoundPage'
// import { ProfilePage } from '@/pages/ProfilePage'

export enum RouteName {
  Main = 'main',
  // About = 'about',
  // Profile = 'profile',
  // NotFound = 'notFound'
}

export const RoutePaths: Record<RouteName, string> = {
  [RouteName.Main]: '/',
  // [RouteName.About]: '/about',
  // [RouteName.Profile]: '/profile',
  // [RouteName.NotFound]: '/*',
}

export const routerConfig: Record<RouteName, RouteProps> = {
  [RouteName.Main]: {
    element: <MainPage />,
    path: RoutePaths.main,
  },
  // [RouteName.About]: {
  //   element: <AboutPage />,
  //   path: RoutePaths.about,
  // },
  // [RouteName.Profile]: {
  //   element: <ProfilePage />,
  //   path: RoutePaths.profile,
  // },
  // [RouteName.NotFound]: {
  //   element: <NotFoundPage />,
  //   path: RoutePaths.notFound,
  // },
}

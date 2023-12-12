import { RouteProps } from 'react-router-dom'
// import { AboutPage } from '@/pages/AboutPage'
import { MainPage } from '@/pages/MainPage'
// import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { GamePage } from '@/pages/GamePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ArticlesDetailPage } from '@/pages/ArticlesDetailPage'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { UserRoles } from '@/entities/User'
import { ForbiddenPage } from '@/pages/ForbiddenPage'

export enum AppRoutes {
  Main = 'main',
  Game = 'game',
  // About = 'about',
  Profile = 'profile',
  Articles = 'articles',
  ArticlesDetail = 'articlesDetail',
  AdminPanel = 'adminPanel',
  Forbidden = 'forbidden',
  NotFound = 'notFound'
}

export type AppRoutesProps = RouteProps & {
  authRequired?: boolean
  roles?: UserRoles[]
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.Game]: '/game',
  // [AppRoutes.About]: '/about',
  [AppRoutes.Profile]: '/profile', // + :id
  [AppRoutes.Articles]: '/articles',
  [AppRoutes.ArticlesDetail]: '/articles', // + :id
  [AppRoutes.AdminPanel]: '/admin', // + :id
  [AppRoutes.Forbidden]: '/forbidden',
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
    path: `${RoutePaths.profile}/:id`,
    // authRequired: true,
  },
  [AppRoutes.Articles]: {
    element: <ArticlesPage />,
    path: RoutePaths.articles,
    // authRequired: true,
  },
  [AppRoutes.ArticlesDetail]: {
    element: <ArticlesDetailPage />,
    path: `${RoutePaths.articlesDetail}/:id`,
    authRequired: true,
  },
  [AppRoutes.AdminPanel]: {
    element: <AdminPanelPage />,
    path: `${RoutePaths.adminPanel}`,
    authRequired: true,
    roles: [UserRoles.ADMIN, UserRoles.MANAGER],
  },
  [AppRoutes.Forbidden]: {
    element: <ForbiddenPage />,
    path: RoutePaths.forbidden,
  },
  [AppRoutes.NotFound]: {
    element: <NotFoundPage />,
    path: RoutePaths.notFound,
  },
}

import { UserRoles } from '@/entities/User'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { ArticlesDetailPage } from '@/pages/ArticlesDetailPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { GamePage } from '@/pages/GamePage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { AppRoutes, AppRoutesProps, RoutePaths } from '@/shared/const/router'

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

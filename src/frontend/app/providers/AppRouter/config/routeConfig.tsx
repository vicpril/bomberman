import { UserRoles } from '@/shared/const/UserRoles'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { ArticlesDetailPage } from '@/pages/ArticlesDetailPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { GamePage } from '@/pages/GamePage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { AppRoutes, AppRoutesProps, GetRoutePaths } from '@/shared/const/router'

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.Main]: {
        element: <MainPage />,
        path: GetRoutePaths.main(),
    },
    [AppRoutes.Game]: {
        element: <GamePage />,
        path: GetRoutePaths.game(),
    },
    // [AppRoutes.About]: {
    //   element: <AboutPage />,
    //   path: GetRoutePaths.about,
    // },
    [AppRoutes.Profile]: {
        element: <ProfilePage />,
        path: GetRoutePaths.profile(':id'),
        authRequired: true,
    },
    [AppRoutes.Articles]: {
        element: <ArticlesPage />,
        path: GetRoutePaths.articles(),
        // authRequired: true,
    },
    [AppRoutes.ArticlesDetail]: {
        element: <ArticlesDetailPage />,
        path: GetRoutePaths.articlesDetail(':id'),
        authRequired: true,
    },
    [AppRoutes.AdminPanel]: {
        element: <AdminPanelPage />,
        path: GetRoutePaths.adminPanel(),
        authRequired: true,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    [AppRoutes.Forbidden]: {
        element: <ForbiddenPage />,
        path: GetRoutePaths.forbidden(),
    },
    [AppRoutes.NotFound]: {
        element: <NotFoundPage />,
        path: GetRoutePaths.notFound(),
    },
}

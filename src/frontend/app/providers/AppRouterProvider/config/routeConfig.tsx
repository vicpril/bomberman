import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { ArticlesDetailPage } from '@/pages/ArticlesDetailPage'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { GamePage } from '@/pages/GamePage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { GetRoutePaths } from '@/shared/const/router'
import { ProfilePage } from '@/pages/ProfilePage'
import { Outlet, RouteObject } from 'react-router-dom'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { UserRoles } from '@/shared/const/UserRoles'
import { RegistrationPage } from '@/pages/RegistrationPage'
import { isAuthenticated, allowRoles, isNotAuthenticated } from '@/entities/User'
import { ProtectedRoute } from '../ui/ProtectedRoute'

export const routerConfig: RouteObject[] = [
    {
        path: GetRoutePaths.main(),
        element: <MainPage />,
    },
    {
        path: GetRoutePaths.game(),
        element: <GamePage />,
    },
    {
        path: GetRoutePaths.profile(':id'),
        element: <ProtectedRoute guards={[isAuthenticated]} />,
        children: [{ index: true, element: <ProfilePage /> }],
    },
    {
        path: GetRoutePaths.articles(),
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <ArticlesPage />,
            },
            {
                path: GetRoutePaths.articlesDetail(':id'),
                element: <ArticlesDetailPage />,
            },
        ],
    },
    {
        path: GetRoutePaths.adminPanel(),
        element: (
            <ProtectedRoute
                guards={[isAuthenticated, allowRoles([UserRoles.ADMIN, UserRoles.MANAGER])]}
                redirectTo={GetRoutePaths.forbidden()}
            />
        ),
        children: [{ index: true, element: <AdminPanelPage /> }],
    },

    {
        path: GetRoutePaths.registration(),
        element: <ProtectedRoute guards={[isNotAuthenticated]} />,
        children: [{ index: true, element: <RegistrationPage /> }],
    },

    {
        path: GetRoutePaths.forbidden(),
        element: <ForbiddenPage />,
    },
    {
        path: GetRoutePaths.notFound(),
        element: <NotFoundPage />,
    },
]

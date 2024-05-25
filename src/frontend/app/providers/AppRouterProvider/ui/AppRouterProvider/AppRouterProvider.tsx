import { RouteObject, RouterProvider, createBrowserRouter, createMemoryRouter } from 'react-router-dom'
import { PageLoader } from '@/widgets/PageLoader'
import { ReactNode } from 'react'
import { routerConfig } from '../../config/routeConfig'

interface Props {
    app?: ReactNode
    mode?: 'browser' | 'memory'
    memoryOptions?: Parameters<typeof createMemoryRouter>[1]
}

const AppRouterProvider = ({ app = <div />, mode = 'browser', memoryOptions }: Props) => {
    const routes: RouteObject[] = [
        {
            element: app,
            children: routerConfig,
        },
    ]

    const router =
        mode === 'browser' ? createBrowserRouter(routes) : createMemoryRouter(routes, memoryOptions)

    return <RouterProvider router={router} fallbackElement={<PageLoader />} />
}

export default AppRouterProvider

import { renderComponent } from '@/shared/lib/tests/renderComponent/renderComponent'
import { AppRoutes, GetRoutePaths } from '@/shared/const/router'
import { screen } from '@testing-library/react'
// eslint-disable-next-line fsd-project/layer-imports
import App from '@/app/ui/App/App'
import { UserRoles } from '@/shared/const/UserRoles'
import AppRouterProvider from './AppRouterProvider'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

const renderRouter = (options?: Parameters<typeof renderComponent>[1]) => {
    // @ts-ignore
    const initialEntry = options?.route?.path ?? options?.route ?? '/'
    return renderComponent(
        <AppRouterProvider
            app={<App />}
            mode="memory"
            memoryOptions={{
                initialEntries: [initialEntry],
            }}
        />,
        { ...options, withRouting: false },
    )
}

describe('AppRouterProvider.test', () => {
    test('Страница отображается', async () => {
        renderRouter({ route: GetRoutePaths[AppRoutes.Game]() })

        const page = await screen.findByTestId('GamePage')
        expect(page).toBeInTheDocument()
    })

    test('Страница не найдена', async () => {
        renderRouter({ route: '/asfasfasfasf' })

        const page = await screen.findByTestId('NotFoundPage')
        expect(page).toBeInTheDocument()
    })

    // TODO - падает при CI
    test('Доступ запрещен к закрытой страницы для НЕ авторизованного пользователя', async () => {
        renderRouter({ route: GetRoutePaths[AppRoutes.Profile]('1') })

        const page = await screen.findByTestId('MainPage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ разрешен к закрытой страницы для авторизованного пользователя', async () => {
        renderRouter({
            route: GetRoutePaths[AppRoutes.Profile]('1'),
            initialState: { user: { authData: { id: '1' } } },
        })

        const page = await screen.findByTestId('ProfilePage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ запрещен (отсутствует роль)', async () => {
        renderRouter({
            route: GetRoutePaths[AppRoutes.AdminPanel](),
            initialState: {
                user: { authData: { id: '1' } },
            },
        })

        const page = await screen.findByTestId('ForbiddenPage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ разрешен (присутствует роль)', async () => {
        renderRouter({
            route: GetRoutePaths[AppRoutes.AdminPanel](),
            initialState: {
                user: { authData: { id: '1', roles: [UserRoles.ADMIN] } },
            },
        })

        const page = await screen.findByTestId('AdminPanelPage')
        expect(page).toBeInTheDocument()
    })
})

import { renderComponent } from '@/shared/lib/tests/renderComponent/renderComponent'
import { AppRoutes, GetRoutePaths } from '@/shared/const/router'
import { screen } from '@testing-library/react'
import { UserRoles } from '@/shared/const/UserRoles'
import AppRouter from './AppRouter'

describe('AppRouter.test', () => {
  test('Страница отображается', async () => {
    renderComponent(<AppRouter />, {
      route: GetRoutePaths[AppRoutes.Game](),
    })

    const page = await screen.findByTestId('GamePage')
    expect(page).toBeInTheDocument()
  })

  test('Страница не найдена', async () => {
    renderComponent(<AppRouter />, {
      route: '/asfasfasfasf',
    })

    const page = await screen.findByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ к закрытой страницы для авторизованного пользователя', async () => {
    renderComponent(<AppRouter />, {
      route: GetRoutePaths[AppRoutes.AdminPanel](),
    })

    const page = await screen.findByTestId('MainPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ запрещен (отсутствует роль)', async () => {
    renderComponent(<AppRouter />, {
      route: GetRoutePaths[AppRoutes.AdminPanel](),
      initialState: {
        user: { authData: { id: '1' } },
      },
    })

    const page = await screen.findByTestId('ForbiddenPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ разрешен (присутствует роль)', async () => {
    renderComponent(<AppRouter />, {
      route: GetRoutePaths[AppRoutes.AdminPanel](),
      initialState: {
        user: { authData: { id: '1', roles: [UserRoles.ADMIN] } },
      },
    })

    const page = await screen.findByTestId('AdminPanelPage')
    expect(page).toBeInTheDocument()
  })
})

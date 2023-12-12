import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { renderComponent } from '@/shared/lib/tests/renderComponent/renderComponent'
import ProfilePage from './ProfilePage'
import { Profile } from '@/entities/Profile'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { $api } from '@/shared/api/api'
import { profileUpdateReducer } from '@/features/ProfileEdit/model/slices/updateProfile/updateProfile'

const profile: Profile = {
  id: 1,
  firstname: 'admin',
  lastname: 'admin',
  age: 465,
  currency: Currency.USD,
  country: Country.Russia,
  username: 'admin213',
}

const component = (
  <Routes>
    <Route
      path="/profile/:id"
      element={<ProfilePage />}
    />
  </Routes>
)

const options: Parameters<typeof renderComponent>[1] = {
  route: '/profile/1',
  initialState: {
    user: {
      authData: { id: '1', username: 'admin213' },
    },
    profile: {
      data: profile,
    },
    profileUpdate: {
      form: profile,
    },
  },
  asyncReducers: {
    profileUpdate: profileUpdateReducer,
  },
}

describe('pages/ProfilePage', () => {
  test('Отображается кнопка редактировать у текущего пользователя', async () => {
    renderComponent(component, options)
    expect(screen.getByTestId('ProfilePage.editBtn')).toBeInTheDocument()
  })

  test('Не отображается кнопка редактировать у пользователя с другим userId', async () => {
    renderComponent(component, { ...options, route: '/profile/2' })
    expect(screen.queryByTestId('ProfilePage.editBtn')).not.toBeInTheDocument()
  })

  test('Режим должен переключиться', async () => {
    renderComponent(component, options)
    await userEvent.click(screen.getByTestId('ProfilePage.editBtn'))
    expect(screen.queryByTestId('ProfileEditForm.submitBtn')).toBeInTheDocument()
    expect(screen.queryByTestId('ProfileEditForm.cancelBtn')).toBeInTheDocument()
  })

  test('Должна появляться ошибка', async () => {
    renderComponent(component, options)

    await userEvent.click(screen.getByTestId('ProfilePage.editBtn'))

    expect(screen.queryByTestId('ProfileEditForm.errors')).not.toBeInTheDocument()

    await userEvent.clear(screen.getByTestId('ProfileEditForm.firstname'))

    await userEvent.click(screen.getByTestId('ProfileEditForm.submitBtn'))

    expect(screen.getByTestId('ProfileEditForm.errors')).toBeInTheDocument()
  })

  test('Должна вызываться метод PUT', async () => {
    const mockApi = jest.spyOn($api, 'put')

    renderComponent(component, options)

    await userEvent.click(screen.getByTestId('ProfilePage.editBtn'))

    await userEvent.clear(screen.getByTestId('ProfileEditForm.firstname'))
    await userEvent.type(screen.getByTestId('ProfileEditForm.firstname'), 'user')

    await userEvent.click(screen.getByTestId('ProfileEditForm.submitBtn'))

    expect(mockApi).toHaveBeenCalledWith('users/1/', { ...profile, firstname: 'user' })
  })
})

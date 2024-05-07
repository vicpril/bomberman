import { TestProvider } from '@/shared/lib/tests/renderComponent/renderComponent'
import { ProfilePage } from '@/pages/ProfilePage'
import { GetRoutePaths } from '@/shared/const/router'

const USER_ID = '1'

describe('ProfilePage.cy.tsx', () => {
  it('playground', () => {
    cy.intercept('GET', '**/users/*', { fixture: 'profile.json' })

    cy.mount(
      <TestProvider
        options={{
          route: {
            path: GetRoutePaths.profile(':id'),
            route: GetRoutePaths.profile(USER_ID),
          },
          initialState: {
            user: { authData: { id: USER_ID } },
          },
        }}
      >
        <ProfilePage />
      </TestProvider>,
    )
  })
})

import { USER_LOCALSTORAGE_KEY } from '../../../src/frontend/shared/const/localStorage'
import { User } from '../../../src/frontend/entities/User'
import { selectByTestId } from '../../helpers/selectByTestId'

export const login = (username: string = 'admin', password: string = '123') => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/v1/login',
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))
    return body
  })
}

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId))
}

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<User>
      getByTestId(testId: string): Chainable<ReturnType<cy['get']>>
    }
  }
}

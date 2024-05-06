export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('ProfilePage.editBtn').click()
  cy.getByTestId('ProfileEditForm.firstname').clear().type(firstname)
  cy.getByTestId('ProfileEditForm.lastname').clear().type(lastname)
  cy.getByTestId('ProfileEditForm.submitBtn').click()
}

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:3001/api/v1/users/${profileId}/`,
    // headers: { Authorization: 'asasf' },
    body: {
      firstname: 'admin',
      lastname: 'admin',
      age: 33,
      avatar: null,
      country: 'Russia',
      currency: null,
      id: profileId,
      city: null,
      userId: 1,
      createdAt: '2023-12-17T02:10:21.556Z',
      updatedAt: '2024-05-06T09:50:54.867Z',
      username: 'admin',
    },
  })
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}

let profileId = ''

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      profileId = data.id
      cy.visit(`profile/${profileId}`)
    })
  })

  afterEach(() => {
    cy.resetProfile(profileId)
  })

  it('И профиль успешно загружается', () => {
    cy.getByTestId('ProfileField.firstname').should('have.text', 'admin')
  })

  it('И успешно обновляется', () => {
    const newFirstname = 'test'
    const newlastname = 'test'
    cy.updateProfile(newFirstname, newlastname)
    cy.getByTestId('ProfileField.firstname').should('have.text', newFirstname)
    cy.getByTestId('ProfileField.lastname').should('have.text', newlastname)
  })
})

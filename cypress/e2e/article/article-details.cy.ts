let articleId = ''

describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((article) => {
      articleId = article.id
      cy.visit(`articles/${articleId}`)
    })
  })

  afterEach(() => {
    cy.removeArticle(articleId)
  })

  it('И видит содержимое статьи', () => {
    cy.getByTestId('ArticleDetails.Content').should('exist')
  })
  it('И видит список рекоммендаций', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist')
  })
  it('И оставляет комментарий', () => {
    cy.getByTestId('ArticleDetails.Content')
    cy.getByTestId('AddCommentForm').scrollIntoView()
    cy.addComment('text')
    cy.getByTestId('CommentCard.Content.Paragraph').should('have.length', 1)
  })
  it('И ставит оценку', () => {
    cy.getByTestId('ArticleDetails.Content')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.setRate(4, 'feedback')
    cy.get('[data-selected=true]').should('have.length', 4)
  })
})

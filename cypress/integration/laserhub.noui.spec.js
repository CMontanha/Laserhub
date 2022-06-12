import login from '../fixtures/login.js';

Cypress.Cookies.debug(true)

beforeEach(() => {
  cy.visit('https://app.laserhub.com/')
})

describe('Cookie Test', () => {

  it.only('Login with cookie', () => {

    cy.acceptCookies()

    cy.login(login.username, login.password)

    cy.getCookies().should('exist')
  })
})
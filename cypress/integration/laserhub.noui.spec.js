import login from '../fixtures/login.js';

Cypress.Cookies.debug(true)

beforeEach(() => {
  cy.visit('https://app.laserhub.com/')
})

describe('Cookie Test', () => {

  it.only('Login with cookie', () => {
    
    //Accept cookies with a request
    cy.acceptCookies()

    cy.loginRequest()

    
  })
})
import login from '../fixtures/login.js';

Cypress.Cookies.debug(true)

beforeEach(() => {
  cy.setCookies()
  cy.visit('https://app.laserhub.com/')
})

describe('Laserhub login test', () => {

  it.only('Login', () => {

    cy.loginRequest().then((response) => {
      cy.visit('https://app.laserhub.com' + response.body.redirectURL)
    })

    //Confirming we have a loged in session inspecting cookies
    cy.getCookie('session_laserhub')
      .should('not.be.empty')

    //Read session_laserhub content

  })
})

describe('Cannot login with wrong information', () => {

  it('Wrong username, correct password', () => {

  })

  it('Correct username, wrong password', () => {

  })

  it('Both empty fields', () => {

  })

  it('User empty field', () => {

  })

  it('Password empty field', () => {

  })
})

describe('Logout works', () => {

  it('Login and logout', () => {
    
  })
})
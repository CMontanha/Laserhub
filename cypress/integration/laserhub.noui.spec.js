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


    cy.request('https://app.laserhub.com/api/users/me').then((response) => {
      expect(response.body).to.have.property('lastName')
      expect(response.body.lastName).to.eq('Testy')
      expect(response.status).to.eq('200')
    })

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
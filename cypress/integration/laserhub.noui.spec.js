import login from '../fixtures/login.js';

Cypress.Cookies.debug(true)

beforeEach(() => {
  cy.setCookies()
  cy.visit('https://app.laserhub.com/')
})

describe('Laserhub login test', () => {

  it('Login', () => {

    cy.loginRequest().then((response) => {
      cy.visit('https://app.laserhub.com' + response.body.redirectURL)
    })

    //Confirming we have a loged in session inspecting cookies
    cy.getCookie('session_laserhub')
      .should('not.be.empty')

    //Checking some properties of the account
    cy.request('https://app.laserhub.com/api/users/me').then((response) => {
      expect(response.body).to.have.property('lastName')
      expect(response.body.lastName).to.eq('Testy')
      expect(response.status).to.eq(200)
    })

  })
})

describe('Cannot login with wrong information', () => {

  it('Wrong username, correct password', () => {

    cy.wrongLoginRequest(login.wrongUsername, login.password).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('Correct username, wrong password', () => {

    cy.wrongLoginRequest(login.Username, login.wrongPassword).then((response) => {
      expect(response.status).to.eq(422)
    })
  })
  it('Both empty fields', () => {

    cy.wrongLoginRequest('', '').then((response) => {
      expect(response.status).to.eq(422)
    })
  })
  it('User empty field', () => {

    cy.wrongLoginRequest('', login.password).then((response) => {
      expect(response.status).to.eq(422)
    })
  })

  it('Password empty field', () => {

    cy.wrongLoginRequest(login.username, '').then((response) => {
      expect(response.status).to.eq(422)
    })
  })
})

describe('Logout works', () => {

  it('Login and logout', () => {

    cy.loginRequest().then((response) => {
      cy.visit('https://app.laserhub.com' + response.body.redirectURL)
    })

    //Request to log out
    cy.request('POST', 'https://app.laserhub.com/api/logout').then((response) => {
      expect(response.status).to.eq(200)
    })

  })
})

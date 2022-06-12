import login from '../fixtures/login.js';

beforeEach(() => {
  cy.visit('https://app.laserhub.com/')
})

describe('Laserhub login test', () => {

  it('Login', () => {

    cy.url().should('contain', '/login')

    cy.acceptCookies()

    cy.login(login.username, login.password)

    //Confirming login worked using UI
    //Navigating to personal settings menu
    cy.visit('https://app.laserhub.com/account/personal-settings')

    //Info should contain test name attributed to the account
    cy.contains('Test')
      .should('be.visible')
    cy.contains('Company account')
      .should('be.visible')

    //Should have a logout button
    cy.get('.btn')
      .within(() => {
        cy.contains('Logout')
          .should('be.visible')
      })
  })
})

describe('Cannot login with wrong information', () => {

  it('Wrong username, correct password', () => {

    cy.acceptCookies()

    cy.login(login.wrongUsername, login.password)
    
    cy.contains('ERROR')
      .should('be.visible')

    cy.contains('User with this e-mail was not found, please register.')
      .should('be.visible')
  })

  it('Correct username, wrong password', () => {

    cy.acceptCookies()

    cy.login(login.username, login.wrongPassword)

    cy.contains('ERROR')
      .should('be.visible')

    cy.contains('Invalid username or password.')
      .should('be.visible')
  })

  it('Both empty fields', () => {

    cy.acceptCookies()

    cy.get('button')
     .contains('Login')
     .click()

    //If login not successful URL should still be /login
    cy.url().should('equal', 'https://app.laserhub.com/login')

    //Login button should still be visible
    cy.get('button')
      .contains('Login')
      .should('be.visible')
  })

  it('Username empty field', () => {

    cy.acceptCookies()

    cy.get('#password')
      .type(login.password, {force:true})

    cy.get('button')
      .contains('Login')
      .click()

    //If login not successful URL should still be /login
    cy.url().should('equal', 'https://app.laserhub.com/login')

    //Login button should still be visible
    cy.get('button')
      .contains('Login')
      .should('be.visible')
  })

  it('Password empty field', () => {

    cy.acceptCookies()

    cy.get('#email')
      .type(login.username, {force:true})

    cy.get('button')
      .contains('Login')
      .click()

    //If login not successful URL should still be /login
    cy.url().should('equal', 'https://app.laserhub.com/login')

    //Login button should still be visible
    cy.get('button')
      .contains('Login')
      .should('be.visible')
  })

})

describe('Logout works', () => {

  it('Login and logout', () => {

    cy.acceptCookies()

    cy.login(login.username, login.password)

    cy.visit('https://app.laserhub.com/logout')

    cy.url()
      .should('equal', 'https://laserhub.com/')
  })
})
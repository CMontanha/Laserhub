// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import login from '../fixtures/login.js';

Cypress.Commands.add('login', (username, password) => {
  //Insert login information using the UI
  cy.get('#email')
    .type(username, { force: true })
  cy.get('#password')
    .type(password, { force: true })

  //Click login button
  cy.get('button')
    .contains('Login')
    .click()

  //Wait action so all the page loads
  cy.wait(2500)
})

Cypress.Commands.add('acceptCookies', () => {
  //Accept cookies button using UI
  cy.get('#onetrust-accept-btn-handler')
    .click()

  //Wait action so all the page loads
  cy.wait(2500)
})

Cypress.Commands.add('setCookies', () => {

  cy.setCookie('OptanonAlertBoxClosed', '2022-07-04T20:52:53.475Z')

})

Cypress.Commands.add('loginRequest', () => {

let body = {
  email: login.username,
  password: login.password
}

  cy.request("POST", "https://app.laserhub.com/api/login", body)

})

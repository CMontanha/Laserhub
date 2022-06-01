import login from '../fixtures/login.json';

describe('Laserhub login test', () => {

  before(() => {
    cy.visit('https://app.laserhub.com/login')
    cy.fixture('login').as('username')
  })

  it('Login', () => {

    //Accept cookies button
    cy.get('#onetrust-accept-btn-handler')
      .should('be.visible')
      .click()

    //Insert login information
    cy.get('#email').should('be.visible')
      .type('kkkkkk', {force:true})
    cy.get('#password')
      .type('yyyyyyy', {force:true})
    cy.get('button').contains('Login').click()
  })
})
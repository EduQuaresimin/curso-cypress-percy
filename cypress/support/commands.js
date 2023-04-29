Cypress.Commands.add('fillMandatoryFields', (firstName, lastName) => {
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type('eduardo@gmail.com')
    cy.get('#agree').check()
})
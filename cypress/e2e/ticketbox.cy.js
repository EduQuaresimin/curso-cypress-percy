const firstName = 'Eduardo'
const lastName = 'Quaresimin'
const tktQnt = '4'

describe('Ticketbox', () => {
    beforeEach(() => cy.visit('index.html'))

    it('Checks for the initial state', () => {
        cy.contains('h1', 'TICKETBOX').should('be.visible')
        cy.percySnapshot()
    })

    it('Checks for invalid email', () => {
        cy.get('#email').type('invalid-email.com')
            .should('have.css', 'background-color', 'rgb(255, 237, 237)')
        cy.percySnapshot()    
    })
    it('Enables submission after all mandatory fields are filled', () => {
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('eduardo@gmail.com')
        cy.get('#agree').check()
        cy.contains('button', 'Confirm Tickets')
            .should('have.css', 'background-color', 'rgb(76, 126, 243)')
        cy.percySnapshot()
    })
    it('Updates agreement based on full name, tickets quantity and type', () => {
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#ticket-quantity').select(tktQnt)
        cy.get('#vip').click()
        cy.contains('p', `I, ${firstName} ${lastName}, wish to buy ${tktQnt} VIP tickets. I understand that all ticket sales are final.`)
        cy.percySnapshot()
    })
    
    const successfullyFormSubmission = 'Successfully sends the form'
    it(successfullyFormSubmission, () => {
        cy.fillMandatoryFields(firstName, lastName)
        cy.contains('button', 'Confirm Tickets').click()
        cy.get('.success').should('be.visible')
        cy.percySnapshot(
            successfullyFormSubmission,
            {
                percyCSS: `.success span { display: none }`
            }
        )
    })
})

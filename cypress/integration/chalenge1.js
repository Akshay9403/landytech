import * as login from "../../cypress/support/pom/pom"
describe('Login', () => {
    beforeEach(function () {
        cy.visit(`http://localhost:3000`)
    })
    it('Scenario 1 - check required fields', () => {
        login.email().type('sesame@landytech.com')
        login.pass()
        login.button().click()
        login.ass1().should('have.text','Please input your password!')
    })
    it('Scenario 2 - check invalid password', () => {
        login.email().type('sesame@landytech.com')
        login.pass().type('12345')
        login.button().click().click()
        cy.get('span.Home_errorMsg__TaZVo').should('have.text','Invalid email or password')
   })
   it('Scenario 3 - check successful login', () => {
    login.email().type('sesame@landytech.com')
    login.pass().type('abc123')
    login.button().click().click()
    cy.wait(2000)
    cy.url().should('contain','users')
    cy.contains('Hello Sesame').should('be.visible')
    
})
it('Scenario 4 - check logout', () => {
    cy.visit('http://localhost:3000/users')
    cy.contains('Please do login').should('be.visible')
    cy.get('a[href="/"]').click()
    cy.wait(3000)
    login.email().type('sesame@landytech.com')
    login.pass().type('abc123')
    login.button().click().click()
    cy.wait(2000)
    cy.url().should('contain','users')  
})
})
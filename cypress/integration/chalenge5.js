describe('', () => {
    it('', () => {
        cy.intercept({
            method: "POST",
            url: "http://localhost:3000/api/users/auth"
        }).as('a')
        cy.visit('http://localhost:3000')
        cy.get('#basic_email').type('sesame@landytech.com')
        cy.get('#basic_password').type("abc123")
        cy.get('.ant-btn.ant-btn-primary').click()
        cy.wait("@a")
        cy.contains("Create").last().click()

        cy.intercept({
            method: "GET",
            url: "http://localhost:3000/api/users"
        }).as('a')
        cy.visit('http://localhost:3000')
        cy.get('#basic_email').type('sesame@landytech.com')
        cy.get('#basic_password').type("abc123")
        cy.get('.ant-btn.ant-btn-primary').click()
        cy.wait("@a")
        cy.contains("Create").last().click()
    })
})     
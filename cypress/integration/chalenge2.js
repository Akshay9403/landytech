describe("This scenario allows you to show knowledge about data input", () => {

    it("Creating a new user", () => {
        cy.visit("http://localhost:3000/")
        cy.get('#basic_email').type('sesame@landytech.com')
        cy.get('#basic_password').type("abc123")
        cy.get('.ant-btn.ant-btn-primary').click().as("w")
        cy.wrap("@w")

        cy.wait(1000)
        cy.contains("Create").last().click()
        cy.wait(1000)
        cy.get(".ant-radio-button").last().click({ force: true })
        cy.get("#firstName").type('Newtest1')
        cy.get("#lastName").type('Landy1')
        cy.get("#email").type('test@landyy.com')
        cy.get(".ant-select-selector").last().click()
        cy.get(".ant-select-item-option-content").each((el) => {
        
            if (el.text() == 'User') {
                el.click()
            } else if (el.text() == 'Admin') {
                el.click()
            }
        })
        cy.get('#password').type(12345)
        cy.get('.ant-btn.ant-btn-primary').click()
        cy.url().should("include", "http://localhost:3000/users")
    })

    it("Validate user already created", () => {
        cy.visit("http://localhost:3000/")
        cy.get('#basic_email').type('sesame@landytech.com')
        cy.get('#basic_password').type("abc123")
        cy.get('.ant-btn.ant-btn-primary').click()
        cy.wait(1000)
        cy.contains("Create").last().click()
        cy.wait(1000)
        cy.get(".ant-radio-button").last().click({ force: true })
        cy.get("#firstName").type('Newtest1')
        cy.get("#lastName").type('Landy1')
        cy.get("#email").type('test@landyy.com')
        cy.get(".ant-select-selector").last().click()
        cy.get(".ant-select-item-option-content").each((el) => {
            
            if (el.text() == 'User') {
                el.click()
            } else if (el.text() == 'Admin') {
                el.click()
            }
        })
        cy.get('#password').type(12345)
        cy.get('.ant-btn.ant-btn-primary').click()
        cy.get("div.ant-message-error").invoke("text").then((el)=>{
            cy.log(el)
            expect(el).to.equal('User with the email test@landyy.com already exists')
        })
        
    })

})
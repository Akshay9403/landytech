describe('interview tasks', () => {
    let email = 'sesame@landytech.com'
    let inpassward = 12345
    let passward = 'abc123'
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
    it('tyr to login without informing passward', () => {
        // cy.visit('http://localhost:3000')
        cy.get('#basic_email').type(email)
        cy.get('.ant-btn.ant-btn-primary').click()
        cy.get('.ant-btn.ant-btn-primary').should('have.text', 'Submit')
        cy.get('div[role = "alert"]').should('have.text', 'Please input your password!')
    })

    it('check invalid password', () => {

        cy.get('#basic_email').type(email)
        cy.get('#basic_password').type(inpassward)
        cy.get('.ant-btn.ant-btn-primary').click()
        cy.get('.Home_errorMsg___4J0r').should('have.text', 'Invalid email or password')

    })

    it('check successful login', () => {

        cy.get('#basic_email').type(email)
        cy.get('#basic_password').type(passward)
        cy.get('.ant-btn.ant-btn-primary').click()
        // cy.url().should('eq','http://localhost:3000/users')    //  first way
        // cy.url().should('include','users')                   // second way
        cy.get('.ant-layout-content').last().find('div').find('h3').invoke('text').then((el) => {
            expect(el).to.eq('Hello Sesame')               // first way

            // cy.get('.ant-layout-content').last().invoke('text').then((el) => {
            //     expect(el).contains('Hello Sesame')                               // this is second way

        })


    })
    it.only(' check logout', () => {                // to be run due to error

        // cy.get('#basic_email').type(email)
        // cy.get('#basic_password').type(passward)
        // cy.get('.ant-btn.ant-btn-primary').click()

        // cy.url().should('include', 'users')
       // cy.visit("http://localhost:3000/users")
        cy.contains('Please do login').eq(1).then((el)=>{
            const body = el.contents().find('body')
            cy.log(body)
        })
        // cy.get('.ant-menu-title-content').last().click()
        // cy.get('.aut-iframe')




        })
        
  
    })
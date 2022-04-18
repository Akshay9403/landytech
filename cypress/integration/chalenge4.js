describe('challenge4', () => {
    let email = 'sesame@landytech.com'
    let inpassward = 12345
    let passward = 'abc123'
   
    it.only(" Scenario 8 - Task to replace the duplicated code for login ", () => {

        cy.visit("http://localhost:3000/")
        cy.login('sesame@landytech.com', 'abc123')
        cy.get('.ant-layout-content').find('div').find('h3').invoke('text').then((el) => {
            let str = " "
            let r = /[\w]/
            let con = true
            for (let i = 0; i < email.length; i++) {
                if (con) {
                    if (i == 0) {
                        str = str + email[i].toUpperCase()
                    } else if (r.test(email[i])) {
                        str = str + email[i]
                    } else {
                        con = false
                    }
                }
            }
            expect(el).contains(`Hello${str}`)

        })
        cy.get('.ant-menu-title-content').last().click()

        cy.login('test@landy.com', '12345')
        cy.get('span.Home_errorMsg__TaZVo').should('contain', 'Invalid email or password')


    })


})
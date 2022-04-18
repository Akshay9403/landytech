import {Given , When ,Then, And} from "cypress-cucumber-preprocessor/steps"

Given ('the client has logged with user',()=>{
    cy.visit('http://localhost:3000')
    cy.get('#basic_email').type('sesame@landytech.com')
    cy.get('#basic_password').type('abc123')
    cy.get('button[type="submit"]').last().click()
    cy.wait(4000)
    cy.url().should('contain','users')
    cy.contains('Hello Sesame').should('be.visible')
    
})
And ('navigate to the page',()=>{
    cy.get('a[href="/users/create"]').click()
})
And ('the field Title is',()=>{
    cy.get('div[id="title"]').children().first().click()
})
And ('the field First Name is',()=>{
cy.get('#firstName').type('Sesame')
})
And ('the field Last Name is',()=>{
    cy.get('#lastName').type('Landy')
}) 
And ('the field email is',()=>{
    const appended_no = Math.floor(Math.random() * 900) + 1000;
    const email = 'sesame' + appended_no + '@llandytech.com';
cy.get('#email').type(email)
}) 
And ('the field roles is',()=>{
    cy.get(".ant-select-selector").last().click()
    cy.get(".ant-select-item-option-content").each((el) => {
        //cy.log(el.text())
        if (el.text() == 'User') {
            el.click()
        } else if (el.text() == 'Admin') {
            el.click()
        }
    })
})
And ('the field password is',()=>{
    cy.get('#password').type('64056405',{force: true})
}) 
When ('the client submit the form',()=>{
    cy.get('.ant-btn.ant-btn-primary').click()
})
Then ('the current url is equals to',()=>{
    cy.url().should("include", "/users/create")
})
And ('the list of users contains the record just created',()=>{
    cy.get('li.ant-pagination-next').click()
   cy.get('tr.ant-table-row:last').find('td').eq(1).should('contain','Sesame')
})
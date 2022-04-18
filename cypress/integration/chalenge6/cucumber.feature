Feature: Create Users

  Scenario: Inserting an user successfully
    Given the client has logged with user 
    And navigate to the page 
    And the field Title is 
    And the field First Name is 
    And the field Last Name is 
    And the field email is 
    And the field roles is 
    And the field password is
    When the client submit the form
    Then the current url is equals to
    And the list of users contains the record just created
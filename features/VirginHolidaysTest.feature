Feature:

  Scenario: Add a holiday to hotlist
    Given I am on virgin holidays home page
    And I do a holiday search
    When I add a holiday to a hotlist
    Then I can see that a holiday added to the hotlist on top of the page

  Scenario: Search hotel options
    Given I am on virgin holidays
    When I do a hotel search
    And I proceed to hotel options page
    Then I ca see my board basis
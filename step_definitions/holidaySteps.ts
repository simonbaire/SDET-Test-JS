require ('../support/hooks');

import {Given, When, Before, Then, World} from 'cucumber';
import {stepTimeOut} from '../support/timeouts';
import {BasePageObject} from '../pageObjects/base';
import {HolidayPageObject} from '../pageObjects/holiday';
import {HotListPageObject} from '../pageObjects/hotList';
import {expect} from 'chai';
import {appUrl} from '../support/app';

let basePage: BasePageObject;
let holidayPage: HolidayPageObject;
let hotListPage: HotListPageObject;

Before({timeout: stepTimeOut}, async function(this: World) {
  basePage = new BasePageObject(this.driver);
  holidayPage = new HolidayPageObject(this.driver);
  hotListPage = new HotListPageObject(this.driver);
});

Given(/^I am on virgin holidays home page$/, async () => {
  await basePage.visitHomePage(appUrl);
});

When(/^I do a holiday search$/, async () => {
  await basePage.selectHolidayTab()
  await holidayPage.inputHolidayLocation('Mexico');
  await basePage.selectDestination();
  await holidayPage.selectAirport('London Heathrow');
  await holidayPage.selectDuration('14');
  await holidayPage.selectNumberOfAdults('2');
  await holidayPage.selectNumberOfChildren('0');
  await basePage.search();
});

When(/^I add a holiday to a hotlist$/, async function (this: World) {
  this.chosenHoliday = await basePage.findFirstItemFromResultList();
  await basePage.addFirstItemToHotlist();
  await basePage.goToHotlistPage();
});

Then(/^I can see that a holiday added to the hotlist on top of the page$/, async function (this: World) {
  expect(await hotListPage.getHolidayTitle()).to.equal(this.chosenHoliday)
});
require ('../support/hooks');

import {Given, When, Before, Then, World} from 'cucumber';
import {stepTimeOut} from '../support/timeouts';
import {BasePageObject} from '../pageObjects/base';
import {HolidayPageObject} from '../pageObjects/holiday';
import {HotelPageObject} from '../pageObjects/hotel';
import {HotelDetailPageObject} from '../pageObjects/hotelDetails';
import {expect} from 'chai';
import {appUrl} from '../support/app';

let basePage: BasePageObject;
let holidayPage: HolidayPageObject;
let hotelPage: HotelPageObject;
let hotelDetailPage: HotelDetailPageObject;

Before({timeout: stepTimeOut}, async function(this: World) {
  basePage = new BasePageObject(this.driver);
  holidayPage = new HolidayPageObject(this.driver);
  hotelPage = new HotelPageObject(this.driver);
  hotelDetailPage = new HotelDetailPageObject(this.driver);
});

Given(/^I am on virgin holidays$/, async () => {
  await basePage.visitHomePage(appUrl);
});

When(/^I do a hotel search$/, async () => {
  await basePage.selectHotelTab();
  await hotelPage.inputHotelLocation('New York');
  await basePage.selectDestination();
  await hotelPage.selectHotelDuration('14');
  await hotelPage.selectNumberOfAdults('3');
  await hotelPage.selectNumberOfChildren('0');
  await basePage.search();
});

When(/^I proceed to hotel options page$/, async function (this: World) {
  this.chosenHotel = await basePage.findFirstItemFromResultList();
  await basePage.selectContinueForFirstItem();
});

Then(/^I ca see my board basis$/, async function (this: World) {
  expect(await hotelDetailPage.getHotelBoardBasis()).to.include('Room Only');
});
import {WebDriver, ByHash} from 'selenium-webdriver';
import {WebdriverUtils} from '../support/webdriverUtils';

export class HolidayPageObject extends WebdriverUtils {
  holidaySearchBox: ByHash = {id: 'holiday-typeahead-typeahead'};
  suggestedHolidays: ByHash = {id: 'holiday-typeahead-typeahead-results'};
  airport: ByHash = {id: 'holiday-gatways'};
  duration: ByHash = {id: 'holiday-duration'};
  numberOfAdults: ByHash = {id: 'holiday-rooms-0-adults'};
  numberOfChildren: ByHash = {id: 'holiday-rooms-0-children'};

  constructor(driver: WebDriver) {
    super(driver);
  }

  inputHolidayLocation = async (holidayLocation: string) => {
    await this.clear(this.holidaySearchBox);
    await this.setValue(this.holidaySearchBox, holidayLocation);
    await this.waitUntilElementLoadedAndDisplayed(this.suggestedHolidays)
  }

  selectAirport = async (airport: string) => {
    await this.waitForElementEnabled(this.airport);
    await this.setValue(this.airport, airport);
  }

  selectDuration = async (duration: string) => {
    this.setValue(this.duration, duration);
  }

  selectNumberOfAdults = async (numberOfAdults: string) => {
    await this.setValue(this.numberOfAdults, numberOfAdults);
  }

  selectNumberOfChildren = async (numberOfChildren: string) => {
    await this.setValue(this.numberOfChildren, numberOfChildren);
  }
}
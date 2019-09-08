import {WebDriver, ByHash} from 'selenium-webdriver';
import {WebdriverUtils} from '../support/webdriverUtils';

export class HotelPageObject extends WebdriverUtils {
  hotelSearchBox: ByHash = {id: 'hotel-typeahead-typeahead'};
  suggestedHotels: ByHash = {id: 'hotel-typeahead-typeahead-results'};

  hotelDuration: ByHash = {id: 'hotel-duration'};
  numberOfAdults: ByHash = {id: 'hotel-rooms-0-adults'};
  numberOfChildren: ByHash = {id: 'hotel-rooms-0-children'};

  constructor(driver: WebDriver) {
    super(driver);
  }

  inputHotelLocation = async (hotelLocation: string) => {
    await this.clear(this.hotelSearchBox);
    await this.setValue(this.hotelSearchBox, hotelLocation);
    await this.waitUntilElementLoadedAndDisplayed(this.suggestedHotels)
  }

  selectHotelDuration = async (duration: string) => {
    await this.setValue(this.hotelDuration, duration);
  }

  selectNumberOfAdults = async (numberOfAdults: string) => {
    await this.setValue(this.numberOfAdults, numberOfAdults);
  }

  selectNumberOfChildren = async (numberOfChildren: string) => {
    await this.setValue(this.numberOfChildren, numberOfChildren);
  }
}
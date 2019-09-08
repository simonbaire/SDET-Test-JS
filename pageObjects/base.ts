import {WebDriver, ByHash} from 'selenium-webdriver';
import {WebdriverUtils} from '../support/webdriverUtils';

export class BasePageObject extends WebdriverUtils {
  //Navigation tabs
  holidayTab: ByHash = {css: '#search-panel-nav > li:nth-child(1) > button'};
  hotelTab: ByHash = {css: '#search-panel-nav > li:nth-child(6) > button'};

  //Search options
  destinationList: ByHash = {className: 'sp-location-type-location'};
  searchButton: ByHash = {css: '.sp-tab.sp-selected div.sp-submit-container > button'};

  //Search results
  searchResultTitle: ByHash = {className: 'results-title'};
  searchResultList: ByHash = {css: '.card-detail > header > h2'};

  //Buttons
  addToHotlist: ByHash = {className: 'hotlist-link'};
  hotListLink: ByHash = {className: 'mvhtr-hotlist'};

  constructor(driver: WebDriver) {
    super(driver);
  }

  visitHomePage = async (url: string) => {
    await this.getUrl(url);
  }

  selectHolidayTab = async () => {
    await this.click(this.holidayTab);
  }

  selectHotelTab = async () => {
    await this.click(this.hotelTab);
  }

  selectDestination = async () => {
    await this.waitUntilElementLoadedAndDisplayed(this.destinationList)
    const suggestedItems = await this.findElements(this.destinationList)
    await suggestedItems[0].click();
  }

  search = async () => {
    await this.click(this.searchButton);
    await this.waitUntilElementLoadedAndDisplayed(this.searchResultTitle)
  }

  findFirstItemFromResultList = async () => {
    const resultList = await this.findElements(this.searchResultList);
    await this.scrollElementToView(resultList[0]);
    const firstItemHeader = await resultList[0].getText();
    return firstItemHeader
  }

  selectContinueForFirstItem = async () => {
    const continueButtons = await this.findElements(this.searchResultList);
    await continueButtons[0].click();
  }

  addFirstItemToHotlist = async () => {
    const hotListLinks = await this.findElements(this.addToHotlist);
    await this.waitForElementEnabled(this.addToHotlist)
    await hotListLinks[0].click();
    await this.waitForElementContainText(this.addToHotlist, 'Remove from my Hotlist')
  }

  goToHotlistPage = async () => {
    await this.click(this.hotListLink);
  }
}
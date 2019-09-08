import {WebDriver, ByHash} from 'selenium-webdriver';
import {WebdriverUtils} from '../support/webdriverUtils';

export class HotListPageObject extends WebdriverUtils {
  holidayDetails: ByHash = {className: 'card'}
  holidayTitle: ByHash = {className: 'card-title'}

  constructor(driver: WebDriver) {
    super(driver);
  }

  getHolidayTitle = async () => {
    const title = await this.findElement(this.holidayTitle);
    await this.scrollElementToView(title);
    await this.waitUntilElementLoadedAndDisplayed(this.holidayDetails)
    const titleText = await title.getText();
    return titleText;
  }

}

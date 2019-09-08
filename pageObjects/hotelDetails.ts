import {WebDriver, ByHash} from 'selenium-webdriver';
import {WebdriverUtils} from '../support/webdriverUtils';

export class HotelDetailPageObject extends WebdriverUtils {
  boardBasis: ByHash = {css: 'div.summary-panel'};
  panel: ByHash = {className: 'booking-sidepanel'};

  constructor(driver: WebDriver) {
    super(driver);
  }

  getHotelBoardBasis = async () => {
    const boardBasis = await this.findElement(this.boardBasis);
    await this.waitForElementContainText(this.panel, 'Total price')
    const boardBasisText = await boardBasis.getText();
    return boardBasisText;
  }
}
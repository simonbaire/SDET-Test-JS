import {elementWaitTimeOutValue} from './timeouts';
import {Locator, until, WebDriver, WebElement, WebElementPromise} from 'selenium-webdriver';
import elementTextContains = until.elementTextContains;

const {elementIsEnabled, elementLocated} = until;

export class WebdriverUtils {
  constructor(readonly driver: WebDriver) {
  }

  waitUntilElementLoadedAndDisplayed = async (locator: Locator): Promise<any> => {
    const locatorValue = JSON.stringify(locator);
    this.driver.wait(until.elementLocated(locator), elementWaitTimeOutValue, `Element not located: ${locatorValue}`);
    this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)), elementWaitTimeOutValue,
      `Element not visible: ${locatorValue}`);

    return this.driver.findElement(locator);
  }

  findElement = async (locator: Locator): Promise<WebElementPromise> =>
    this.driver.findElement(locator)

  findElements = async (locator: Locator): Promise<any> =>
    await this.driver.findElements(locator);

  getUrl = async (url: string) =>
    await this.driver.get(url);

  click = async (locator: Locator) =>
    await this.driver.findElement(locator).click();

  setValue = async (locator: Locator, value: string) =>
    await this.driver.findElement(locator).sendKeys(value);

  clear = async (locator: Locator) => {
    const element = await this.findElement(locator);
    await element.clear()
  };

  waitForElementEnabled = async (locator: Locator): Promise<any> =>
    this.driver.wait(elementIsEnabled(await this.findElement(locator)),
      elementWaitTimeOutValue,
      'Element should be enabled');

  waitForElementContainText = async (locator: Locator, text: string): Promise<any> =>
      this.driver.wait(elementTextContains(await this.findElement(locator), text),
          elementWaitTimeOutValue,
          'Element should be enabled');

  scrollElementToView = async (element: WebElement) =>
    await this.driver
      .executeScript('arguments[0].scrollIntoView(true); window.scrollBy(0, -window.innerHeight / 4);', element);
}
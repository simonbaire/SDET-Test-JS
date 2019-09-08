import {After, Before, BeforeAll, AfterAll, Status, World} from 'cucumber';

import {saveScreenshot, createSeleniumDriverInstance} from './testUtilities';
import {WebDriver} from 'selenium-webdriver';
import {profile} from '../conf/config';

let seleniumDriver: WebDriver;
export const capabilities = profile.configuration.capabilities;

Before(async function(this: World) {
  this.driver = seleniumDriver;
});

BeforeAll(async () => {
    seleniumDriver = createSeleniumDriverInstance(capabilities);
});

AfterAll(async () => {
  await seleniumDriver.quit();
});

After(async function(this: World, testRun) {
  //Save screenshot of failed test
  const testResult = testRun.result.status;
  switch (testResult) {
    case Status.PASSED:
      break;
    case Status.FAILED:
      const name = testRun.pickle.name;
      const screenshot = await seleniumDriver.takeScreenshot();
      this.attach(screenshot, 'image/png');
      await saveScreenshot(screenshot, name);
      break;
  }
});

import * as seleniumWebdriver from 'selenium-webdriver';
import {O_CREAT} from 'constants';
import * as makeDir from 'make-dir';
import * as fs from 'fs-extra';

export const createSeleniumDriverInstance = (caps: any) =>
  new seleniumWebdriver.Builder()
    .forBrowser(caps.browserName)
    .withCapabilities(caps)
    .build();

export const saveScreenshot = async (data: any, name: string) => {
  const path = './failedTestScreenshot/screenshots/';
  await makeDir(path);

  fs.open(name, O_CREAT, async () => {
    const filename = `${path}${name}.png`;
    await fs.writeFile(filename, data, {encoding: 'base64', flag: 'wx'});
  });
};

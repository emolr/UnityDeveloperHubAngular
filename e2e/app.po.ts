import { browser, by, element } from 'protractor';

export class AngularPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ut-root h1')).getText();
  }
}

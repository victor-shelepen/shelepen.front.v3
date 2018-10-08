browser.waitForAngularEnabled(false);
let explorationDelay = browser.params.explorationDelay;


let clickMenuLink = async (key, mobile=false, explorationDelay=3000) => {
  let prefix = '';
  if (mobile) {
    await element(by.css('.link-menu')).click();
    await browser.sleep(explorationDelay);
    prefix = '.side-nav ';
  }
  await element(by.css(`${prefix}.link-${key}`)).click();
  await browser.sleep(explorationDelay);
};

let clickResumeLink = async (position, explorationDelay=3000) => {
  await element(by.css(`.section.resume li:nth-child(${position}) .collapsible-header`)).click();
  await browser.sleep(explorationDelay);
};

let clickServiceLink = async (position, explorationDelay=3000) => {
  await element(by.css(`.section.services .card-wrapper:nth-child(${position}) .card-title`)).click();
  await browser.sleep(explorationDelay);
  await element(by.css(`.section.services .card-wrapper:nth-child(${position}) .material-icons.right`)).click();
  await browser.sleep(explorationDelay);
};

let runOnPage = async (mobile=false) => {
  await clickMenuLink('aboutMe', mobile, explorationDelay);
  await clickMenuLink('blog', mobile, explorationDelay);
  await clickMenuLink('resume', mobile, explorationDelay);
  await clickResumeLink(1);
  await clickResumeLink(2);
  await clickResumeLink(3);
  await clickMenuLink('services', mobile, explorationDelay);
  await clickServiceLink(1);
  await clickServiceLink(2);
  await clickMenuLink('contacts', mobile, explorationDelay);
  await clickMenuLink('home', mobile, explorationDelay);
};

describe('Navigate the pages', () => {
  it('English', async () => {
    await browser.get(browser.params.baseUrl + '/en');
    await browser.sleep(explorationDelay);
    await runOnPage(browser.params.mobile)
  });

  it('Russian', async () => {
    await browser.get(browser.params.baseUrl + '/ru');
    await runOnPage(browser.params.mobile)
  });

  it('Ukrainian', async () => {
    await browser.get(browser.params.baseUrl + '/ua');
    await runOnPage(browser.params.mobile)
  });
});
const puppeteer = require('puppeteer')
const {toMatchImageSnapshot} = require('jest-image-snapshot')

expect.extend({toMatchImageSnapshot})
jest.setTimeout(50000000)

const waitForTime = ms => new Promise(r => setTimeout(r, ms));

// let counter = 0;
// {path: `${counter++}.png`}

const browserZoomIn = async (page, persents) => await page.evaluate((persents) => {
  document.body.style.zoom = `${persents}%`;
}, persents);

describe("visual regression testing",()=>{
  let browser
  let page

  beforeAll(async function(){
    browser = await puppeteer.launch({
      headless:false,
      slowMo:100
    })
    page = await browser.newPage()
    await page.setViewport({width: 0, height: 0, deviceScaleFactor:1});
    // NOTE: Viewport {width: 0, height: 0} means "the window size"
  })

  it('Full page Screenshot', async function(){
    await page.goto("https://devexpress.github.io/testcafe/example/")
    // await browserZoomIn(page, 40);

    // await browserZoomIn(page, 40);
    // await page.waitFor(50000000);
    await page.waitForSelector('h1')
    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot({
      failureThresholdType:'pixel',
      failureThreshold:500,
      customSnapshotIdentifier: `test-case-1`,
    })
  })

  it('Screenshot of the single element', async function() {
    await page.goto("https://devexpress.github.io/testcafe/example/")

    // await page.waitFor(50000000);
    const h1 = await page.waitForSelector('h1')
    const image = await h1.screenshot({ /* fullPage: true */ })
    expect(image).toMatchImageSnapshot({
      failureTresholdType: 'percent',
      failureTreshold: 0.01,
      customSnapshotIdentifier: `test-case-2`,
    })
  })

  it('Screenshot of Mobile view', async function() {
    await page.goto("https://devexpress.github.io/testcafe/example/")

    await page.waitForSelector('h1')
    await page.emulate(puppeteer.devices['iPhone X'])
    // await page.waitFor(50000000);
    const image = await page.screenshot({ fullPage: true })
    expect(image).toMatchImageSnapshot({
      failureTresholdType: 'percent',
      failureTreshold: 0.01,
      customSnapshotIdentifier: `test-case-3`,
    })
  })

  it('Screenshot of Tablet view', async function() {
    await page.goto("https://devexpress.github.io/testcafe/example/")

    await page.waitForSelector('h1')
    await page.emulate(puppeteer.devices['iPad landscape'])
    // await page.waitFor(50000000);
    const image = await page.screenshot({ fullPage: true })
    expect(image).toMatchImageSnapshot({
      failureTresholdType: 'percent',
      failureTreshold: 0.01,
      customSnapshotIdentifier: `test-case-4`,
    })
  })

  xit('Remove Element Before Snapshot', async function() {
    await page.evaluate(() => {
      (document.querySelectorAll('h1') || []).forEach(el => el.remove())
    })
    // await page.waitFor(5000)
    // NOTE: waitFor is deprecated and will be removed in a future release.
    // See https://github.com/puppeteer/puppeteer/issues/6214 for details
    // and how to migrate your code.
    await waitForTime(5000)
  })

  afterAll(async function(){
     await browser.close()
  })
});
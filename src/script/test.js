const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--no-sandbox', '--start-maximized' ],
      slowMo:25,
  })
  const page = await browser.newPage();
  await page.goto("https://m.facebook.com")
  const [_, navigation] = await Promise.allSettled([
    await login(page,"ncxqdnzuvh_1642484149@tfbnw.net","112233yy"),
    page.waitForNavigation(),
  ]);
    
  const nm = Math.floor(Math.random() * 501).toString();
  await page.goto('https://www.facebook.com/pages/creation')
  await (await page.waitForXPath('//span[contains(text(),"Page name (required)")]')).click()
  await page.keyboard.type('test' + nm)
  await (await page.waitForXPath('//span[contains(text(),"Category (required)")]')).click()
  await page.keyboard.type('web')
  await page.waitForSelector("li[id='187393124625179']")
  await page.click('li[id="187393124625179"]')
  await (await page.waitForXPath('//span[contains(text(),"Create Page")]')).click()
  await page.waitForXPath('//body/div[4]/ul/li/div[1]/div')
  const close = await page.$x('//body/div[4]/ul/li/div[1]/div/div[2]')
  await close[0].click()
  await (await page.waitForXPath('//span[contains(text(),"Save")]')).click()
  await page.waitForNavigation()
  await page.goto(page.url().replace('www.','mbasic.'))
  
/*     await page.waitFor("#jsc_c_t")
    await page.type("#jsc_c_t", "test_page" + nm)
    await page.type("#jsc_c_y", "web")
    await page.waitFor("li[id='187393124625179']")
    await page.click('li[id="187393124625179"]')
 
    const btCreate = await page.$x('//div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[1]/div/div[3]/div[2]/div/div')

    await btCreate[0].click()
    await page.waitFor('//body/div[4]/ul/li/div[1]/div')
    const close = await page.$x('//body/div[4]/ul/li/div[1]/div/div[2]')
    await close[0].click()

    const btSv = await page.$x('//div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[1]/div/div[3]/div/div/div')
    await btSv[0].click()
    await page.waitForTimeout(3000)
    const pg_url = await page.evaluate(() => document.location.href); */

}
main()


async function login(page,user,pass) {
  await page.waitForSelector("input[name='email']")
  await page.type("input[name='email']",user)
  await page.type("input[name='pass']",pass)
  await page.keyboard.press("Enter")
}
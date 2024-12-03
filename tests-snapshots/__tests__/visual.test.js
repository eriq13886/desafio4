const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

describe('Visual Testing', () => {
    let browser, page

    beforeAll(async () => {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test.only("Captura de pantalla completa", async () => {
        await page.goto("http://example.com");
        await page.waitForSelector("h1");
        const image = await page.screenshot({path: 'image.png'});
        expect(image).toMatchImageSnapshot({
            failureThresholdType: "pixel",
            failureThreshold: 500
        });
        await waitForTimeout(3000);
    });
});

function waitForTimeout(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}
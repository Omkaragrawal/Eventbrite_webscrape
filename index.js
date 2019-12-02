const morgan = require('morgan');
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const data = [[
    "ishubhamsah@gmail.com",
    "Shubham",
    "Sah"
  ],
  [
    "Shubhamsah227644@gmail.com",
    "Shubham",
    "Saha"
  ],
  [
    "omkar3654@gmail.com",
    "Omkar",
    "Agarwal"
  ],
  [
    "ialimustufaats@gmail.com",
    "Ali Mustufa",
    "Shaikh"
  ]];

const registrarEmail = '';
const registrarPassword = '';

app.use(morgan('combined'));
app.listen(8080, () => {
    console.log('hosted on 8080');
});
(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://www.eventbrite.com/attendees-add?eid=84591759229', {
        waitUntil: 'networkidle0',
        timeout:0
    });

    if (page.url().includes('signin')) {
        await page.type('#email', registrarEmail);
        await page.click('[data-reactid *= "125"]');
        await page.waitForNavigation({waitUntil: 'networkidle0', timeout:0});
        await page.type('#password', registrarPassword);
        await page.click('[data-automation *="signup-submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 });
        register(page);
    } else {
        register(page);
    }
})();

const register = async (page) => {
    for (let userDetails of data) {
        await fillForm(page, userDetails);
    }
}

const fillForm = async (page, details) => {
    await page.type('[maxLength *= "5"]', '1');
    await page.click('#continue-attendee');
    // await page.waitForNavigation({ waitUntil: 'load', timeout: 0 });
    await page.waitForSelector('#last_name');
    await page.type('#last_name', details[2]);
    await page.type('#first_name', details[1]);
    await page.type('#email_address', details[0]);
    await page.waitFor(3000);
    await page.waitForSelector('#last_name');
    await page.click('[href *= "freeCheckout();"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout:0 });
    await page.goto('https://www.eventbrite.com/attendees-add?eid=84591759229', {waitUntil: 'load', timeout: 0});
};
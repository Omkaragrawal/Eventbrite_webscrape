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

app.use(morgan('combined'));
app.listen(8080, () => {
    console.log('hosted on 8080');
});
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.eventbrite.com/attendees-add?eid=83168070939', {
        waitUntil: 'networkidle0'
    });

    if (page.url().includes('signin')) {
        await page.type('#email', 'agrawalomkar.16@gmail.com');
        await page.click('[data-reactid *= "125"]');
        await page.waitForNavigation({waitUntil: 'networkidle0'});
        await page.type('#password', 'abcd@1234');
        await page.click('[data-automation *="signup-submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
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
    await page.type('[maxLength *= "5"]', 1);
    await page.click('#continue-attendee');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.type('#last_name', details[2]);
    await page.type('#first_name', details[1]);
    await page.type('#email_address', details[0]);
    await page.click('[href *= "freeCheckout();"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.goto('https://www.eventbrite.com/attendees-add?eid=83168070939', {waitUntil: 'networkidle0'});
};
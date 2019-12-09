const puppeteer = require('puppeteer');
const colors = require('colors');
// const readXlsxFile = require('read-excel-file/node');


const data = [

    [
        "omkar3654@gmail.com",
        "Omkar",
        "Agarwal"
    ],
    [
        "agrawalomkar2@gmail.com",
        "Omkar",
        "Agarwal"
    ]
];
const registrarEmail = '';
const registrarPassword = '';
const addAttendeesPage = 'https://www.eventbrite.com/attendees-add?eid=84591759229';


const startTask = async () => {
    console.time('Total time taken is')
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    console.log("opening the page");
    await page.goto(addAttendeesPage, {
        waitUntil: 'networkidle0',
        timeout: 0
    });
    if (page.url().includes('signin')) {
        console.log("Logging in");
        console.log("Entering Email");
        await page.type('#email', registrarEmail);
        await page.click('[data-reactid *= "125"]');
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
            timeout: 0
        });
        console.log("Entering Password");
        await page.type('#password', registrarPassword);
        await page.click('[data-automation *="signup-submit"]');
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
            timeout: 0
        });
        console.log("Starting the registration process");
        await register(page);
        console.log("Closing the browser");
        await browser.close();
        console.log('Tickets successfully sent');
        console.timeEnd('Total time taken is');
        process.exit(0);
    } else {
        console.log("Starting the registration process");
        await register(page);
        console.log("Closing the browser");
        await browser.close();
        console.log('Tickets successfully sent');
        console.timeEnd('Total time taken is');
        process.exit(0);
    }
};

const register = async (page) => {
    console.log("Starting the form filling process");
    for (let userDetails of data) {
        console.group('User details')
        console.log("Filling the details:");
        console.table(userDetails);
        console.log('--------------XXXXX----------------------\n')
        console.groupEnd();
        await fillForm(page, userDetails);
    }
}

const fillForm = async (page, details) => {
    if (page.url() !== addAttendeesPage) {
        console.log("Going for new registration");
        await page.goto(addAttendeesPage, {
            waitUntil: 'load',
            timeout: 0
        });
    }
    console.time("Total registration time for this entry")
    console.log("Entering '1' for the no. of attendees'");
    await page.type('[maxLength *= "5"]', '1');
    await page.click('#continue-attendee');
    console.log("Waiting for page to start enter attendee details");
    await page.waitForSelector('#last_name');
    console.log("Entering the last name");
    await page.type('#last_name', details[2]);
    console.log("Entering the fast name");
    await page.type('#first_name', details[1]);
    console.log("Entering email id");
    await page.type('#email_address', details[0]);
    // console.log("Waiting for 3 seconds (just to be sure)");
    // await page.waitFor(3000);
    await page.waitForSelector('#last_name');
    console.log("Submitting the form");
    await page.click('[href *= "freeCheckout();"]');
    console.log("Waiting for ticket confirmation")
    await page.waitForNavigation({
        waitUntil: 'networkidle0',
        timeout: 0
    });
    console.log("Final result of confirmation acquired");
    console.timeEnd("Total registration time for this entry")
}

startTask();
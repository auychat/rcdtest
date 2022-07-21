const puppeteer = require("puppeteer");
const yargs = require("yargs");

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto("https://codequiz.azurewebsites.net");

  //===== See the value of p text =====//
  let pElement = await page.waitForSelector("body > p:nth-child(4)");
  let textP = await page.evaluate((pElement) => pElement.textContent, pElement);
  //   console.log(textP);

  //=====  Check we are in the first page or not =====//
  if (textP === "You need to accept cookie to continue") {
    let buttonElement = await page.waitForSelector("body > input[type=button]");
    let textButton = await page.evaluate(
      (buttonElement) => buttonElement.value,
      buttonElement
    );
    // console.log(textButton);

    //===== Click Accept Button for Enter Site =====//
    let click = await page.click('input[value="Accept"]');

    //===== Check Enter Site or not =====//
    let Nav = await page.waitForSelector("body > p");
    let textNav = await page.evaluate((Nav) => Nav.textContent, Nav);
    // console.log(textNav);

    //===== Already Enter Site =====//
    const fundNameArr = [];
    const navArr = [];
    const ourObj = {};

    if (textNav === "Funds NAV") {
      //===== Push Fund Name to Array =====//
      for (let i = 2; i < 6; i++) {
        let fundName = await page.waitForSelector(
          "body > table > tbody > tr:nth-child(" + i + ") > td:nth-child(1)"
        );
        let nav = await page.waitForSelector(
          "body > table > tbody > tr:nth-child(" + i + ") > td:nth-child(2)"
        );

        let textFundName = await page.evaluate(
          (fundName) => fundName.textContent,
          fundName
        );
        let textNav = await page.evaluate((nav) => nav.textContent, nav);
        fundNameArr.push(textFundName.trim());
        navArr.push(textNav);
        // console.log(textFundName);
      }

      //===== Add 2 Arrays to 1 Object =====//
      fundNameArr.forEach((element, index) => {
        ourObj[element] = navArr[index];
      });

      //===== Passing Command Line Arguments =====//
      let command = await yargs.argv._;
      let argValue = command.toString();

      //===== Check Arguments exists in our fund name list =====//
      let exists = Object.keys(ourObj).includes(argValue);
      if (exists === false) {
        console.log("Sorry we don't have that Fund.");
      } else {
        console.log(ourObj[`${argValue}`]);
      }

      // console.log(argValue);
      // console.log(fundNameArr);
      // console.log(navArr);
      // console.log(ourObj);
    }
  }

  browser.close();
}

scrape();

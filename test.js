// const { Builder, By, Key, until } = require("selenium-webdriver");
// const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

let driver;

describe("Goodreads UI Automation Test", function () {
  this.timeout(25000);
  //   let driver;

  before(async function () {
    this.timeout(10000);
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    this.timeout(5000); // Increase the timeout for the after hook
    if (driver) {
      await driver.quit();
    }
  });

  it("should perform the given scenario", async function () {
    try {
      // 1. Login to goodreads.com
      await driver.get("https://www.goodreads.com/");
      await driver.findElement(By.linkText("Sign In")).click();
      await driver.findElement(By.linkText("Sign in with email")).click();
      await driver
        .findElement(By.id("ap_email"))
        .sendKeys("your_email");
      await driver
        .findElement(By.id("ap_password"))
        .sendKeys("your_password", Key.RETURN);
      await driver.wait(until.elementLocated(By.linkText("Home")), 5000);

      // 2. Search for a specific book title
      const bookTitle = "Title of the book";
      await driver
        .findElement(By.className("searchBox__input"))
        .sendKeys(bookTitle, Key.RETURN);
      await driver.findElement(By.className("searchBox__icon")).click();

        await driver.wait(until.titleContains(bookTitle), 5000);

        // 3. Mark it as ‘want to read’
        await driver.findElement(By.className("wtrToRead")).click();
        await driver.wait(
          until.elementLocated(By.className("wtrShelfMenu")),
          5000
        );
        await driver.findElement(By.className("wtrExclusiveShelf")).click();
        await driver.wait(
          until.elementLocated(By.className("wtrExclusiveShelf"), 5000)
        );

        // 4. Remove the selected book from my book list
        await driver.findElement(By.className("wtrShelfMenu")).click();
        await driver.wait(
          until.elementLocated(By.linkText("remove from my books")),
          5000
        );
        await driver.findElement(By.linkText("remove from my books")).click();
        await driver.wait(
          until.elementLocated(By.className("wtrExclusiveShelf")),
          5000
        );

        // 5. Logout
        await driver.findElement(By.className("user-profile-image")).click();
        await driver.wait(until.elementLocated(By.linkText("Sign out")), 5000);
        await driver.findElement(By.linkText("Sign out")).click();
        await driver.wait(until.titleIs("Goodreads | Sign in"), 5000);

        // Test Passes if the execution reaches this line
        assert(true);
    } catch (error) {
      console.error("Test failed:", error);
      assert(false);
    }
  });
});

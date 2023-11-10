const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { DashboardPage } = require("../page-objects/DashboardPage");
const userData = JSON.parse(
  JSON.stringify(require("../test-data/userTestData.json"))
);

let page;
let loginPage;
let dashboardPage;

// Open Browser before each test
test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(userData.URL);
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
});

// Close the page after each test
test.afterEach(async () => {
  await page.close();
});

test("@Smoke Verify that user sign-in functionality and ensure redirection to the TB Dashboard upon successful sign-in.", async ({}) => {
  await loginPage.validLogin(userData.number, userData.password);
  await expect(dashboardPage.dashboardText).toContainText("UAN: 111-832-682");
});

test("@Regression Verify that user sign-in functionality with Invalid Mobile Number or Password and ensure redirection to the TB Dashboard will not happen.", async ({}) => {
  await loginPage.numberField.type(userData.invalidNumber);
  await loginPage.signInButton.click();
  await expect(loginPage.numberFieldMsg).toContainText("Invalid phone number");
  await loginPage.passwordField.type(userData.invalidPassword);
  await loginPage.signInButton.click();
  await expect(loginPage.passwordFieldMsg).toContainText(
    "Password must be less greater then 6 digit"
  );
});

test("@Regression Verify that user sign-in functionality with Invalid Mobile Number and Password and ensure redirection to the TB Dashboard will not happen.", async ({
  page,
}) => {
  await loginPage.numberField.type(userData.invalidNumber);
  await expect(loginPage.numberFieldMsg).toContainText("Invalid phone number");
  await loginPage.passwordField.type(userData.invalidPassword);
  await expect(loginPage.passwordFieldMsg).toContainText(
    "Password must be less greater then 6 digit"
  );
});

test("@Regression Verify that user sign-in functionality with Empty Mobile Number and Password Fields and ensure redirection to the TB Dashboard will not happen. ", async ({
  page,
}) => {
  await loginPage.signInButton.click();
  await expect(loginPage.numberFieldMsg).toContainText(
    "Please input your Contact Number!"
  );
  await expect(loginPage.passwordFieldMsg).toContainText(
    "Please input your password!"
  );
});

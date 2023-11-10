const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { ForgotPasswordPage } = require("../page-objects/ForgotPassword");
const { ResetPassword } = require("../page-objects/ResetPassword");

const userData = JSON.parse(
  JSON.stringify(require("../test-data/userTestData.json"))
);

let page;
let loginPage;
let forgotPasswordPage;
let resetPasswordPage;

// Open Browser before each test
test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(userData.URL);
  loginPage = new LoginPage(page);
  forgotPasswordPage = new ForgotPasswordPage(page);
  resetPasswordPage = new ResetPassword(page);
});

// Close the page after each test
test.afterEach(async () => {
  await page.close();
});

test("@Regression Verify that Forgot Password functionality process with Invalid Mobile Number. ", async ({}) => {
  await loginPage.forgotPasswordLink.click();
  await expect(forgotPasswordPage.forgotPasswordText).toContainText(
    "Enter the contact number associated with your account."
  );
  await forgotPasswordPage.contactNumber.type(userData.invalidNumber);
  await expect(forgotPasswordPage.contactValidationMsg).toContainText(
    "Invalid phone number"
  );
});

test("@Regression Verify that Forgot Password functionality process with Empty Mobile Number.", async ({}) => {
  await loginPage.forgotPasswordLink.click();
  await expect(forgotPasswordPage.forgotPasswordText).toContainText(
    "Enter the contact number associated with your account."
  );
  await forgotPasswordPage.nextButton.click();
  await expect(forgotPasswordPage.contactValidationMsg).toContainText(
    "Please input your contact Number!"
  );
});

test("@Regression Verify that user is unabled to excute forgot password flow if OTP is incorrect. 	", async ({}) => {
  await loginPage.forgotPasswordLink.click();
  await forgotPasswordPage.contactNumber.fill(userData.number);
  await forgotPasswordPage.nextButton.click();
  await resetPasswordPage.otpField.type(userData.invalidPin);
  await resetPasswordPage.newPassword.type(userData.testPassword);
  await resetPasswordPage.confirmPassword.type(userData.testPassword);
  await resetPasswordPage.submitButton.click();
  await expect(resetPasswordPage.optErrorMsg).toContainText("Otp code not found");
});

test("@Regression verify that user forgot password flow not able to preceed if OTP field is empty.", async ({}) => {
  await loginPage.forgotPasswordLink.click();
  await forgotPasswordPage.contactNumber.fill(userData.number);
  await forgotPasswordPage.nextButton.click();
  await resetPasswordPage.newPassword.type(userData.testPassword);
  await resetPasswordPage.confirmPassword.type(userData.testPassword);
  await resetPasswordPage.submitButton.click();
  await expect(resetPasswordPage.optValidationMsg).toContainText("Please enter OTP Code.");
});

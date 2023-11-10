class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.forgotPasswordText = page.locator(
      '[class="ant-col mb-20 mt-1 ant-col-md-24 css-6d9yoo"]'
    );
    this.contactNumber = page.locator('[data-testid="phone-input"]')
    this.contactValidationMsg = page.locator('[class="ant-form-item-explain-error"]')
    this.nextButton = page.locator('[data-testid="next-btn"]')
  }
}

module.exports = { ForgotPasswordPage };

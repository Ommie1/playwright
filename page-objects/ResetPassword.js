class ResetPassword {
  constructor(page) {
    this.page = page;
    this.otpField = page.locator('[data-testid="otp-input"]');
    this.newPassword = page.locator('[data-testid="new-password-input"]');
    this.confirmPassword = page.locator(
      '[data-testid="re-enter-password-input"]'
    );
    this.submitButton = page.locator('[data-testid="submit-btn"]');
    this.optErrorMsg = page.locator('[class="ant-notification-notice-description"]');
    this.optValidationMsg = page.locator('[class="ant-form-item-explain-error"]')
  }
}

module.exports = { ResetPassword };

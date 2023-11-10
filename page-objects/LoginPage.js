class LoginPage {
    constructor(page) {
      this.page = page;
      this.numberField = page.locator('[data-testid="phone-input"]');
      this.numberFieldMsg = page.locator('[id="basic_phoneNumber_help"]')
      this.passwordField = page.locator('[data-testid="password-input"]');
      this.passwordFieldMsg = page.locator('[id="basic_password_help"]')
      this.signInButton = page.locator('[data-testid="login-btn"]');
      this.forgotPasswordLink = page.locator('[class="forget-password-link"]')
    }
  
    async validLogin(number, password) {
      await this.numberField.fill(number);
      await this.passwordField.fill(password);
      await this.signInButton.click();
    }
  }
  
  module.exports = { LoginPage };













// class LoginPage {
//   constructor(page) {
//     this.page = page;
//     this.numberField = page.locator('[data-testid="phone-input"]');
//     this.passwordField = page.locator('[data-testid="password-input"]');
//     this.signInButton = page.locator('[data-testid="login-btn"]');
//   }
//   async langingPage() {
//     await this.page.goto("https://qa.takafulbazaar.com.pk/auth");
//   }

//   async validLogin(number, password) {
//     await this.numberField.type(number);
//     await this.signInButton.type(password);
//     await this.signInButton.click();
//   }
// }
// module.exports = { LoginPage };

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardText = page.locator(
      '[class="ant-typography UAN css-6d9yoo"]'
    );
  }
}

module.exports = { DashboardPage };

class SearchPage {

    constructor(page) {
      this.page = page;
    }

    async navigate() {
      await this.page.goto('https://duckduckgo.com/');
    }

    async search(text) {
      await this.page.locator('input[name=q]').fill(text);
      await this.page.keyboard.press('Enter');
    }
  }

  module.exports = { SearchPage };

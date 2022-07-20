class SearchResultsPage {

  constructor(page) {
    this.page = page;
  }

  async getResultHeadingHrefAttribute(index) {
    return await this.page.locator(`#r1-${index} h2 a`).getAttribute('href');
  }

  async doesOneOfResultHrefContain(text) {
    let link;
    for (let i = 0; i < 10; i++){
      link = await this.getResultHeadingHrefAttribute(i);
      if ( link.includes(text)){
        return true;
      }
    }
    return false;
  }

}

module.exports = { SearchResultsPage };

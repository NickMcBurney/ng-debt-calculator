import { DebtConsolidationPage } from './app.po';

describe('debt-consolidation App', function() {
  let page: DebtConsolidationPage;

  beforeEach(() => {
    page = new DebtConsolidationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

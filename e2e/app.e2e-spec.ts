import { SimPage } from './app.po';

describe('sim App', () => {
  let page: SimPage;

  beforeEach(() => {
    page = new SimPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

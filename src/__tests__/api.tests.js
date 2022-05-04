import { articles, articlesDailyViews, articlesExcerpt } from "../api";
const unmockedFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          items: [
            {
              project: "en.wikipedia",
              access: "all-access",
              year: "2022",
              month: "04",
              day: "01",
              articles: [
                {
                  article: "Main_Page",
                  views: 11673899,
                  rank: 1,
                },
              ],
            },
          ],
        }),
    })
  );
});

afterEach(() => {
  global.fetch = unmockedFetch;
});

describe("articles", () =>
  it("gets a list of articles with the most page views for a given day", () => {
    const date = "2022/04/01";
    const result = articles(date);

    return expect(result).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          article: expect.any(String),
          views: expect.any(Number),
          rank: expect.any(Number),
        }),
      ])
    );
  }));

describe("articles", () =>
  it("throws an error if invalid date provided", () => {
    const invalidDate = "2022-4-1";
    const result = articles(invalidDate);

    expect(result).rejects.toThrowError(
      `Invalid Date:${invalidDate}. Please submit date in yyyy/mm/dd format after 2001 such as, 2022/04/01.`
    );
  }));

describe("articles", () =>
  it("returns cause of failure if request fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject(expect.any(String)),
      })
    );
    const dateBeforeWikipediaExisted = "2000/04/01";
    const result = await articles(dateBeforeWikipediaExisted);

    expect(result).toContain("REQUEST FAILED");
  }));

describe("articlesDailyViews", () => {
  xit("gives daily views for a given page for a given month", () => {
    const pageTitle = expect.any(String);
    const startingDate = "2015100100";
    const endingDate = "2015103100";
    // account for days only after wikipedia existed 
    const result = articlesDailyViews(pageTitle, startingDate, endingDate);
    
    // expect to have been called with correct starting and ending range. try using jest.spyOn()
  });
});

describe("articlesSummary", () =>
  xit("includes the page’s title, summary paragraph, and summary paragraph html", () => {
    const pageTitle = expect.any(String);
    const details = {
      displayTitle: expect.any(String),
      extract_html: expect.any(String),
      extract: expect.any(String),
    };

    const result = articlesExcerpt(pageTitle);

    expect(result).toBe(expect.objectContaining(details));
  }));
// 169 ms
// https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/all-agents/Pet%20door/daily/20220401/20220401
// Include the page’s title, a preview of the first paragraph, and the top 3 days the page was viewed this month
// Detailed View props - maintains state and requests for additional details:
//        props: Read more: https://en.wikipedia.org/wiki/React_(JavaScript_library)
//        excerpt summary: https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow
//        pagetitle
//        top 3 days of the month: https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/all-agents/Barack_Obama/monthly/2016010100/2016123100
// memoize/hash?
// sockets

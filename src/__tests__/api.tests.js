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


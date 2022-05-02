import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();
import { articles, articlesDetail } from "../api";

describe("articles", () =>
  it("gets a list of articles with the most page views for a specific day", () => {
    const date = "2022/04/01";
    const result = articles(date);

    // highlight-start
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
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
    // highlight-end

    return expect(fetchMock).resolves.toEqual(
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
  xit("throws an error if invalid date provided", () => {
    const invalidDate = "2022-4-1";
    const result = articles(invalidDate);

    expect(result).rejects.toThrowError(
      `Invalid Date:${invalidDate}. Please submit date in yyyy/mm/dd format.`
    );
  }));

describe("articlesDetail", () =>
  xit("includes the page’s title, a preview of the first paragraph, and the top 3 days the page was viewed this month", () => {
    const articleDetails = {
      title: "",
      summary: "",
      monthlyTopThree: [],
    };

    const result = articlesDetail(pageTitle);

    expect(result).toBe(articleDetail);
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

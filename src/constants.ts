export const DEFAULT_LIMIT = 100;
export const TOP_PAGE_VIEWS_ENDPOINT = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access';
export const SEARCH_BY_COUNTRY="https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country";
// Include the page’s title, a preview of the first paragraph, and the top 3 days the page was viewed this month
// Detailed View props - maintains state and requests for additional details:
//        props: Read more: https://en.wikipedia.org/wiki/React_(JavaScript_library)
//        excerpt summary: https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow
//        pagetitle
//        top 3 days of the month: https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews#Monthly_counts
// regex for yyyy/mm/dd date format
export const yyyyMMDD = /^\d{4}\/\d{2}\/\d{2}$/;
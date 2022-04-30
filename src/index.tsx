import React from 'react';
import ReactDOM from 'react-dom';

import Page from "./components/Page";
import "./styles.scss";
// calendar - maintains state of date to be searched make reusable returns a date onDateSelect
// dropdown - props: label title, list of selections, action onSelect
// Card - name of the article, the number of views and the rank.
// Allow a user to open a “detailed view” of any article in the queue.
// Include the page’s title, a preview of the first paragraph, and the top 3 days the page was viewed this month
// Detailed View props - maintains state and requests for additional details:
//        props: Read more: https://en.wikipedia.org/wiki/React_(JavaScript_library)
//        excerpt summary: https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow
//        pagetitle
//        top 3 days of the month: https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews#Monthly_counts

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root')
);

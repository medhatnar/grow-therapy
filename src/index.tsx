import React from 'react';
import ReactDOM from 'react-dom';

import Page from "./components/Page";
import "./styles.scss";
// calendar - maintains state of date to be searched make reusable returns a date onDateSelect
// dropdown - props: label title, list of selections, action onSelect
// Card - name of the article, the number of views and the rank.
// Allow a user to open a “detailed view” of any article in the queue.


ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root')
);

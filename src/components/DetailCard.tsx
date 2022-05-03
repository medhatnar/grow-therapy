import React from "react";
import { articlesExcerpt, articlesDailyViews } from "../api";

type DetailCardProps = {
  dateObj: {
    year: string;
    month: string;
    day: string;
  };
  title: string | number;
};

export default function DetailCard(props: DetailCardProps) {
  const { dateObj, title } = props;
  return (
    <div className="detail-card">
      <span>&#10006;</span>
      <header>
        <h2>Top views for</h2>
        <h2>{title}</h2>
      </header>
      <ul>
        {["24 views - 4/12/22", "24 views - 4/12/22", "24 views - 4/12/22"].map(
          (viewCountData) => (
            <li>{viewCountData}</li>
          )
        )}
      </ul>
      <div>
        <p>
          <b>Amber Laura Heard</b> is an American actress. Beginning her career
          in the early 2000s, she first came to prominence for her roles in the
          2008 films <i>Never Back Down</i> and <i>Pineapple Express</i>. Heard
          gained further recognition for portraying Mera in the DC Extended
          Universe (DCEU), most prominently appearing in <i>Aquaman</i> (2018)
          and its upcoming 2023 sequel. Outside of her acting career, Heard is a
          global spokesperson for the cosmetics giant L'Oréal Paris and a human
          rights activist.
        </p>
      </div>
      <footer>full article &#x2192;</footer>
    </div>
  );
}

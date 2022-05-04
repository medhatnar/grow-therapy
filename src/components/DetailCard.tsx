import { timeStamp } from "console";
import React, { useEffect, useState } from "react";
import { articlesExcerpt, articlesDailyViews } from "../api";
import { FULL_ARTICLE } from "../constants";
import { dateRange } from "../utils";

type DetailCardProps = {
  date: {
    year: string;
    month: string;
    day: string;
  };
  title: string;
};

export default function DetailCard(props: DetailCardProps) {
  const { date, title } = props;
  const readMoreLink = `${FULL_ARTICLE}/${title}`;
  const [top3DaysOfMonth, setTop3DaysOfMonth] = useState([]);
  const [extract, setExtract] = useState<string | null>("<div></div>");

  useEffect(() => {
    getDetails();
    return () => {
      setTop3DaysOfMonth([]);
      setExtract(null);
    };
  }, []);

  async function getDetails() {
    const range = dateRange(date.year, date.month);
    await articlesExcerpt(title).then((excerpt) => {
      setExtract(excerpt.extract_html);
    });
    await articlesDailyViews(title, range.startingDate, range.endingDate).then(
      (views) => {
        const viewsDescending = views.items
          .sort(
            (
              a: { timestamp: string; views: number },
              b: { timestamp: string; views: number }
            ) => {
              return b.views - a.views;
            }
          )
          .slice(0, 3);
        const top3Views = viewsDescending.map(
          (viewsData: { timestamp: string; views: number; pageid: number }) => {
            const year = viewsData.timestamp.substring(0, 4);
            const month = viewsData.timestamp.substring(4, 6);
            const day = viewsData.timestamp.substring(6, 8);

            return {
              views: viewsData.views,
              id: viewsData.pageid,
              timestamp: `${day}/${month}/${year}`,
            };
          }
        );
        setTop3DaysOfMonth(top3Views);
      }
    );
  }

  return (
    <div className="detail-card">
      <span>&#10006;</span>
      <header>
        <h2>Top views for</h2>
        <h2>{title}</h2>
      </header>
      <ul>
        {top3DaysOfMonth.map(
          (viewsData: { id: number; timestamp: string; views: number }) => (
            <li key={viewsData.id}>
              {viewsData.views} views - {viewsData.timestamp}
            </li>
          )
        )}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: extract }}></div>
      <footer>
        <a href={readMoreLink}>full article &#x2192;</a>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Card from "./Card";
import Dropdown from "./Dropdown";
import DetailCard from "./DetailCard";
import { DEFAULT_LIMIT } from "../constants";
import { yesterday, stripSpecialChars } from "../utils";
import { articles } from "../api";

export default function Page() {
  const [date, setDate] = useState({
    year: "2020",
    month: "01",
    day: "01",
  });
  const [results, setResults] = useState<
    { article: string; rank: number; views: number }[]
  >([]);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setDate(yesterday()), []);

  useEffect(() => {
    async function getArticles() {
      const newResults = await articles(
        `${date.year}/${date.month}/${date.day}`
      );
      if (Array.isArray(newResults)) {
        setResults(newResults);
      } else {
        console.log("error", newResults);
        setError(newResults);
      }
    }
    getArticles();
  }, [date]);

  const handleGetDetails = (title: string) => {
    // const handleGetDetails = (title: string) => {
    //     const summary = articlesSummary(title);
    //     const top3Days = articlesDailyViews;
    //     const readMoreLink = `${READ_MORE}/${title}`;
    // }
    // const summary = articlesSummary(title);
    const startingDate = `${date.year}${date.month}0100`;
    // get helper function to get how many days are in a given month
    const endingDate = `${date.year}${date.month}3000`;
  };
  return (
    <div className="container">
      <header>
        <h1>Wikipedia's Most Viewed Articles</h1>
      </header>
      <Calendar
        label="Start Date:"
        startDate={`${date.year}-${date.month}-${date.day}`}
        onDateSelect={setDate}
      />
      <Dropdown
        defaultOption={DEFAULT_LIMIT}
        options={[25, 50, 75, 100, 200]}
        onSelect={setLimit}
      />
      {error ? (
        <span>{error}</span>
      ) : (
        <div className="sub-container">
          {results.slice(0, limit).map((item, i) => {
            return (
              <div key={item.views}>
                  <summary>
                    <Card
                      title={stripSpecialChars(item.article)}
                      subtitle={item.rank}
                      detailsLabel={"Views"}
                      details={item.views}
                    />
                  </summary>
                  <DetailCard title={item.article} dateObj={date} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

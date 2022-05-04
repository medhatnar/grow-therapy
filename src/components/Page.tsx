import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Card from "./Card";
import Dropdown from "./Dropdown";
import DetailCard from "./DetailCard";
import { DEFAULT_LIMIT } from "../constants";
import { stripSpecialChars, yesterday } from "../utils";
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
    getArticles();
  }, [date]);

  async function getArticles() {
    const newResults = await articles(`${date.year}/${date.month}/${date.day}`);
    if (Array.isArray(newResults)) {
      setResults(newResults);
    } else {
      console.log("error", newResults);
      setError(newResults);
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Wikipedia's Most Viewed Articles</h1>
      </header>
      <Calendar
        defaultDay={date.day}
        defaultMonth={date.month}
        defaultYear={date.year}
        label="Start Date:"
        maxMonth={date.month}
        maxYear={date.year}
        minMonth={"07"}
        minYear={"2015"}
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
              <details key={item.views}>
                <summary>
                  <Card
                    title={stripSpecialChars(item.article)}
                    subtitle={item.rank}
                    detailsLabel={"Views"}
                    details={item.views}
                  />
                </summary>
                <DetailCard title={item.article} date={date} />
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}

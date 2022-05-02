import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Card from "./Card";
import Dropdown from "./Dropdown";
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
      const newResults = await articles(`${date.year}/${date.month}/${date.day}`);
      if (Array.isArray(newResults)) {
        setResults(newResults);
      } else {
        setError(newResults);
      }
    }
    getArticles();
  }, [date]);

  return (
    <div className="container">
      <header>Wikipedia's Most Viewed Articles</header>
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
          {results.slice(0, limit).map((item) => {
            return (
              <Card
                key={item.article}
                title={stripSpecialChars(item.article)}
                subtitle={item.rank}
                detailsLabel={"Views"}
                details={item.views}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

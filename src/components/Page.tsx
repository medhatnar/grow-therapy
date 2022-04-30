import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Dropdown from "./Dropdown";
import { DEFAULT_LIMIT } from "../constants";
import { yesterday } from "../utils";
import {Card} from './Card';

export default function Page() {
  const [date, setDate] = useState({ year: "2022", month: "01", day: "01" });
  const [results, setResults] = useState<
    { article: string; rank: number; views: number }[]
  >([]);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  useEffect(() => setDate(yesterday()), []);

  useEffect(() => {
    fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${date.year}/${date.month}/${date.day}`
    )
      .then((response) => response.json())
      .then((data) => {
        const newResults = data.items[0].articles;
        setResults(newResults);
      });
  }, [date]);

  return (
    <div className="container">
      <Card />
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
      {results.slice(0,limit).map((item, i) => (
        <div key={item.article}>{item.article}{i}</div>
      ))}
    </div>
  );
}

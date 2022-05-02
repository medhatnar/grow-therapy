import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Card from "./Card";
import Dropdown from "./Dropdown";
import { DEFAULT_LIMIT } from "../constants";
import { yesterday, stripSpecialChars } from "../utils";
import { articles, articlesExcerpt, articlesDailyViews } from "../api";

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
        console.log('error', newResults);
        setError(newResults);
      }
    }
    getArticles();
  }, [date]);

  const handleGetDetails = (title: string) => {
    // const summary = articlesSummary(title);
    const startingDate = `${date.year}${date.month}0100`;
    // get helper function to get how many days are in a given month
    const endingDate = `${date.year}${date.month}3000`;
    articlesDailyViews(title,startingDate, endingDate);
  }
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
          <p><b>Amber Laura Heard</b> is an American actress. Beginning her career in the early 2000s, she first came to prominence for her roles in the 2008 films <i>Never Back Down</i> and <i>Pineapple Express</i>. Heard gained further recognition for portraying Mera in the DC Extended Universe (DCEU), most prominently appearing in <i>Aquaman</i> (2018) and its upcoming 2023 sequel. Outside of her acting career, Heard is a global spokesperson for the cosmetics giant L'Oréal Paris and a human rights activist.</p>
          {results.slice(0, limit).map((item, i) => {
            return (
              <div key={item.views} >
              <span onMouseEnter={()=> handleGetDetails(item.article)}>{item.article}</span>
              <Card
                title={stripSpecialChars(item.article)}
                subtitle={item.rank}
                detailsLabel={"Views"}
                details={item.views}
              />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

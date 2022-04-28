import React, { useState, useEffect } from "react";
import { DEFAULT_NUMBER_OF_RESULTS } from "../constants";
import { yesterday } from '../utils';

export default function Page() {
  const [date, setDate] = useState();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`${process.env.TOP_PAGE_VIEWS}${date}`)
      .then((response) => response.json())
      .then((data) =>
        console.log(data)
      );
  }, []);
  
  function limitResults(data: { items: [{ articles: [] }] }, limit: number) {
    return data.items[0].articles.slice(0, limit);
  }
  console.log('result', results);
  return (
    <div className="container">
      <header>Wikipedia's Most Viewed Articles</header>
      {yesterday()}
    </div>
  );
}

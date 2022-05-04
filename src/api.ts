import {
  ARTICLE_SUMMARY,
  PAGE_VIEWS,
  TOP_PAGE_VIEWS,
  yyyyMMDD,
} from "./constants";

export const articles = async (date: string) => {
  if (!date.match(yyyyMMDD))
    throw new Error(
      `Invalid Date:${date}. Please submit date in yyyy/mm/dd format after 2001 such as, 2022/04/01.`
    );
  const data = await fetch(`${TOP_PAGE_VIEWS}/${date}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(String(res.status));
      }
    })
    .then((results) => results.items[0].articles)
    .catch((err) => {
      return `REQUEST FAILED:${err}`;
    });

  return data;
};

export const articlesDailyViews = async (
  title: string,
  startingDate: string,
  endingDate: string
) => {
  const data = await fetch(
    `${PAGE_VIEWS}/${title}/daily/${startingDate}/${endingDate}`
  )
    .then((res) => res.json())
    .then((result) => result);
  
  return data;
};

export const articlesExcerpt = async (pageTitle: string) => {
  const data = await fetch(`${ARTICLE_SUMMARY}/${pageTitle}`)
    .then((res) => res.json())
    .then((results) => {
      return results;
    });

  return data;
};

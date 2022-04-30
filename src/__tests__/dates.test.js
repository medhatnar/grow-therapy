import { yesterday } from "../utils";

describe("yesterday", () =>
  test("returns yesterday's year/month/date", () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dayBefore = date.toDateString();
    const yyyymmdd = /^\d{4}\/\d{2}\/\d{2}$/;

    const result = yesterday();
    const yesterdayDate = new Date(result);

    expect(yesterdayDate.toDateString()).toEqual(dayBefore);
  }));

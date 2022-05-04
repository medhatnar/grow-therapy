import { dateRange, stripSpecialChars, yesterday } from "../utils";

describe("stripSpecialChars", () =>
  it("replaces special characters excluding periods/parenthesis with spaces", () => {
    const specialCharString = "A._J._Brown_(American_football)";
    const sanitizedString = "A. J. Brown (American football)";

    const result = stripSpecialChars(specialCharString);

    expect(result).toEqual(sanitizedString);
  }));

describe("yesterday", () =>
  it("returns yesterday's year/month/date", () => {
    const todayDate = new Date().getTime();

    const result = yesterday();
    const monthIndexOffset = result.month - 1;
    const yesterdayDate = new Date(
      result.year,
      monthIndexOffset,
      result.day
    ).getTime();

    expect(yesterdayDate).toBeLessThan(todayDate);
  }));

describe("dateRange", () =>
  it("returns a date range formatted for wikipedia api daily views endpoint", () => {
    const year = "2020";
    const month = "02";
    const startingDate = "2020020100";
    const endingDate = "2020022900";

    const result = dateRange(year, month);

    expect(result).toStrictEqual(
      expect.objectContaining({ startingDate, endingDate })
    );
  }));

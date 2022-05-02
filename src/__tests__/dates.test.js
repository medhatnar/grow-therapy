import { yesterday } from "../utils";

describe("yesterday", () =>
  it("returns yesterday's year/month/date", () => {
    const todayDate = new Date().getTime();

    const result = yesterday();
    const monthIndexOffset = result.month - 1
    const yesterdayDate = new Date(result.year, monthIndexOffset, result.day).getTime();

    expect(yesterdayDate).toBeLessThan(todayDate);
  }));

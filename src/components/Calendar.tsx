import React from "react";

type CalendarProps = {
  defaultDay: string | number;
  label?: string;
  maxMonth?: string;
  maxYear?: string;
  minMonth?: string | number;
  maxDay?: string | number;
  minYear?: string | number;
  defaultMonth: string | number;
  defaultYear: string | number;
  onDateSelect?: (option: any) => void;
};
// set min date and max date
export default function Calendar(props: CalendarProps) {
  const {
    defaultDay,
    defaultMonth,
    defaultYear,
    label,
    maxMonth,
    maxYear,
    maxDay,
    minMonth,
    minYear,
    onDateSelect,
  } = props;
  // add format validation
  const formatDate = (
    year: string | number,
    month: string | number,
    day: string | number
  ) => {
    return `${year}-${month}-${day}`;
  };

  const normalizeDate = (dateValue: string) => {
    const dateNumbers = dateValue.split("-");
    return {
      year: dateNumbers[0],
      month: dateNumbers[1],
      day: dateNumbers[2],
    };
  };

  return (
    <div className="container">
      <label htmlFor="start">{label}</label>
      <input
        id="calendar-input"
        name="calendar-input"
        type="date"
        value={formatDate(defaultYear, defaultMonth, defaultDay)}
        onChange={(e) => onDateSelect(normalizeDate(e.target.value))}
        min={formatDate(minYear, minMonth, "01")}
        max={formatDate(maxYear, maxMonth, maxDay)}
      ></input>
    </div>
  );
}

import React from "react";

type CalendarProps = {
  label?: string;
  startDate: string;
  onDateSelect: (option: any) => void;
};

export default function Calendar(props: CalendarProps) {
  const { label, startDate, onDateSelect } = props;

  const normalizeDate = (dateValue: string) => {
    const dateNumbers = dateValue.split("-");
    onDateSelect({
      year: dateNumbers[0],
      month: dateNumbers[1],
      day: dateNumbers[2],
    });
  };

  return (
    <div className="container">
      <label htmlFor="start">{label}</label>
      <input
        id="calendar-input"
        name="calendar-input"
        type="date"
        value={startDate}
        onChange={(e) => normalizeDate(e.target.value)}
      ></input>
    </div>
  );
}

import React from "react";

type CalendarProps = {
  label?: string;
  startDate: string;
  onDateSelect: (option: any) => void;
};
 // set min date and max date
export default function Calendar(props: CalendarProps) {
  const { label, startDate, onDateSelect } = props;
  // add format validation
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
        value={startDate}
        onChange={(e) => onDateSelect(normalizeDate(e.target.value))}
      ></input>
    </div>
  );
}

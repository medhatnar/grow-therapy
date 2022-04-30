import React from "react";

type DropdownProps = {
  label?: string;
  options: string[] | number[];
  defaultOption?: string | number;
  onSelect: (option: any) => void;
};

export default function Dropdown(props: DropdownProps) {
  const { label, defaultOption, options, onSelect } = props;

  return (
    <div className="container">
      <label htmlFor="drop-down">{label}</label>
      <select
        defaultValue={defaultOption}
        name="drop-down-selector"
        id="drop-down"
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map((option, i) => {
          return (
            <option key={`${i}option`} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

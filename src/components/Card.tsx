import React from "react";

type CardProps = {
  description?: string;
  details: string | number;
  detailsLabel: string;
  subtitle?: string | number;
  title: string | number;
};

export default function Card(props: CardProps) {
  const { description, details, detailsLabel, subtitle, title } = props;
  return (
    <div className="card">
      <div style={{ flexGrow: 1 }}>
        <div>
          <h3 className="title">{title}</h3>
          <span className="subtitle">{subtitle}</span>
        </div>
        <p className="description">{description}</p>
      </div>
      <div className="details">
        {detailsLabel}
        <span className="details-label">{details}</span>
      </div>
    </div>
  );
}

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
      <div className="card-titles">
        <p className="subtitle">{subtitle}</p>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-details">
      <label className="card-details-label">
        {detailsLabel}
        <div id="detail">{details}</div>
      </label>
      <a className="info-link" href="#">preview &#8964;</a>
      </div>
    </div>
  );
}

import React, { ReactElement, useState } from "react";

type CardProps = {
  details: string | number;
  detailsLabel?: string | ReactElement;
  subtitle?: string | number;
  title: string | number;
};

export default function Card(props: CardProps) {
  const { details, detailsLabel, subtitle, title } = props;

  return (
    <div className="card">
      <div className="card-titles">
        <p className="subtitle">{subtitle}</p>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-details">
        <label className="card-details-label">
          <>
            {detailsLabel}
            <div id="detail">{details}</div>
          </>
        </label>
        <p className="info-link" role="button">
          preview &#x2193;
          </p>
      </div>
    </div>
  );
}

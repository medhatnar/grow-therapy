import React from 'react';

export const Card = ({
}) => {
  return (
    <div className="card">
      <div>
        <div>
          <h3>title</h3>
          <span>subtitle</span>
        </div>
        <p>description</p>
      </div>
      <div>
        details
        <span>label</span>
        <a href="#" target="blank">
          info link
        </a>
      </div>
    </div>
  );
};
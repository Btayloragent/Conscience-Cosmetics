import React, { useState } from 'react';
import './Rating.css'; // Ensure you have the CSS file

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <React.Fragment key={value}>
          <input
            type="checkbox"
            id={`star${value}`}
            value={value}
            checked={selectedRating >= value}
            onChange={() => handleRatingChange(value)}
            className="icon"
          />
          <label htmlFor={`star${value}`} className="icon"></label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Rating;



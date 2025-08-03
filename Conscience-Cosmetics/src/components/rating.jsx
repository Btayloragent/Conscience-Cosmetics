import React, { useEffect, useState } from 'react';
import './Rating.css';

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const videoId = localStorage.getItem('currentVideoId');

  useEffect(() => {
    if (!token || !userId || !videoId) return;

    const fetchRating = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/users/${userId}/ratings/${videoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          setSelectedRating(0);
          return;
        }

        const data = await res.json();
        setSelectedRating(data.rating || 0);
      } catch (error) {
        setSelectedRating(0);
      }
    };

    fetchRating();
  }, [token, userId, videoId]);

  const handleRatingChange = async (value) => {
  setSelectedRating(value);
  if (!token || !userId || !videoId) {
    console.log("Missing auth or videoId", { token, userId, videoId });
    return;
  }

  try {
    console.log("Sending rating to backend:", { videoId, rating: value });
    const res = await fetch(`http://localhost:5001/api/users/${userId}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ videoId, rating: value }),
    });
    if (!res.ok) {
      console.error("Failed to save rating", await res.text());
    } else {
      console.log("Rating saved successfully");
    }
  } catch (err) {
    console.error("Error saving rating:", err);
  }
};


  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <React.Fragment key={value}>
          <input
            type="checkbox"
            id={`star${value}`}
            value={value}
            checked={selectedRating >= value} // all stars up to selectedRating checked
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






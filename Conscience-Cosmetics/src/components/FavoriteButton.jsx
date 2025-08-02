// components/FavoriteButton.jsx
import React, { useState, useEffect } from "react";
import FavLips from "../pictures/FavPics/FavLips.png";

const FavoriteButton = ({ videoId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteVideos")) || [];
    setIsFavorite(saved.includes(videoId));
  }, [videoId]);

  const toggleFavorite = () => {
    let saved = JSON.parse(localStorage.getItem("favoriteVideos")) || [];

    if (isFavorite) {
      saved = saved.filter(id => id !== videoId);
    } else {
      saved.push(videoId);
    }

    localStorage.setItem("favoriteVideos", JSON.stringify(saved));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="rounded-full transition hover:scale-105"
      aria-label={isFavorite ? "Unfavorite" : "Favorite"}
    >
      <img
        src={FavLips}
        alt="Favorite"
        className={`w-8 h-8 object-contain transition duration-200 filter ${
          isFavorite ? "brightness-125" : "brightness-50"
        }`}
      />
    </button>
  );
};

export default FavoriteButton;



import React, { useState, useEffect } from "react";
import FavLips from "../pictures/FavPics/FavLips.png";
import axios from "axios";

const FavoriteButton = ({ videoId, videoFile, videoThumbnail }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Read fresh user info from localStorage inside effect and toggleFavorite
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !videoId || !token) return;

    axios.get(`http://localhost:5001/api/users/${userId}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      const favs = res.data;
      setIsFavorite(favs.some(fav => fav.videoId === videoId));
    })
    .catch(err => {
      console.error("Failed to fetch favorites:", err);
    });
  }, [videoId]);

  const toggleFavorite = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("You must be logged in to favorite videos.");
      return;
    }

    if (isFavorite) {
      axios.delete(`http://localhost:5001/api/users/${userId}/favorites/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setIsFavorite(false))
      .catch(() => alert("Failed to remove favorite"));
    } else {
      axios.post(`http://localhost:5001/api/users/${userId}/favorites`, 
        { videoId, videoFile, videoThumbnail }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => setIsFavorite(true))
      .catch(() => alert("Failed to add favorite"));
    }
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


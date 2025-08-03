import React, { useEffect, useState } from "react";
import axios from "axios";

const FavoriteVideos = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5001/api/users/${userId}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFavorites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch favorite videos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading favorite videos...</p>;
  }

  if (favorites.length === 0) {
    return <p>No favorite videos yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {favorites.map((fav) => (
        <div key={fav.videoId} className="w-32">
          <img
            src={fav.videoThumbnail || "default-thumbnail.png"}
            alt={`Video ${fav.videoId}`}
            className="rounded-lg object-cover w-full h-20"
          />
        </div>
      ))}
    </div>
  );
};

export default FavoriteVideos;


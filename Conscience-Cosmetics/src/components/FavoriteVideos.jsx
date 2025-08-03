import React, { useEffect, useState } from "react";
import axios from "axios";

const FavoriteVideos = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:5001/api/users/${userId}/favorites`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const favs = res.data;

        // Use Map to remove duplicates by videoId
        const uniqueMap = new Map();
        favs.forEach(fav => {
          uniqueMap.set(fav.videoId, fav);
        });

        setFavorites(Array.from(uniqueMap.values()));
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p className="text-center text-gray-300">Loading favorites...</p>;

  if (favorites.length === 0) return <p className="text-center text-gray-300">No favorite videos yet.</p>;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {favorites.map(({ videoId, videoThumbnail }) => (
        <img
          key={videoId}
          src={videoThumbnail}
          alt={`Favorite video ${videoId}`}
          className="w-24 h-24 object-cover rounded-md shadow-md"
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default FavoriteVideos;


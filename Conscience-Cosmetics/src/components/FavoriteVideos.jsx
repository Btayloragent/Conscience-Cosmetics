import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  return (
    <div style={{ fontFamily: "Merriweather, serif" }}>
      {loading ? (
        <p>Loading favorite videos...</p>
      ) : favorites.length === 0 ? (
        <p>No favorite videos yet.</p>
      ) : (
        <div className="flex flex-wrap gap-4 p-4">
          {favorites.map((fav) => (
            <Link
              to={`/VideoPage/${fav.videoId}`}
              key={fav.videoId}
              className="w-32"
              title="Go to video"
            >
              <img
                src={fav.videoThumbnail || "default-thumbnail.png"}
                alt={`Video ${fav.videoId}`}
                className="rounded-lg object-cover w-full h-20 cursor-pointer"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteVideos;



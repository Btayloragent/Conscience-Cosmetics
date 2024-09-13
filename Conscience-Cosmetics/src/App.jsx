import React, { useState } from 'react';
import Navbar from './components/NavBar.jsx';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(query) {
    try {
      setQuery(query);
      let response = await axios.get(
        `https://api.pexels.com/videos/search?query=makeup&per_page=9`,
        {
          headers: {
            Authorization: process.env.VID_KEY, // Correctly use the environment variable
          }
        }
      );
      setResults(response.data.videos);
    } catch (error) {
      console.error('Error fetching videos: ' + error);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar onSearch={handleSearch} /> {/* Pass handleSearch to NavBar */}
      {/* You can now render the search results */}
      <div className="video-grid">
        {results.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default App;

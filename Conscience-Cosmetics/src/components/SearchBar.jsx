import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        axios
          .get(`http://localhost:5001/api/users/search?q=${searchTerm}`)
          .then((res) => {
            setUserResults(res.data);
            setShowDropdown(true);
          })
          .catch(() => {
            setUserResults([]);
            setShowDropdown(false);
          });
      } else {
        setUserResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (!searchTerm.trim()) return;
    if (userResults.length > 0) {
      navigate(`/profile/${userResults[0].username}`);
      setSearchTerm('');
      setShowDropdown(false);
    } else {
      alert('No users found');
    }
  };

  return (
    <div className="form-control flex flex-row items-center w-3/4 max-w-lg relative">
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(userResults.length > 0)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        className="input input-bordered w-full bg-white border-black text-black pr-10"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchClick();
          }
        }}
      />
      <button
        className="absolute right-0 top-0 bottom-0 mt-auto mb-auto mr-2 bg-transparent border-none flex items-center justify-center"
        style={{ height: '100%' }}
        onClick={handleSearchClick}
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black transition-colors duration-300 ease-in-out hover:text-beige"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {showDropdown && userResults.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border rounded shadow-md z-50 max-h-60 overflow-y-auto">
          {userResults.map((user) => (
            <li key={user._id} className="hover:bg-gray-100 p-2">
              <Link
                to={`/profile/${user.username}`}
                onClick={() => {
                  setSearchTerm('');
                  setShowDropdown(false);
                }}
                className="flex items-center gap-2"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-6 h-6 rounded-full object-cover"
                />
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

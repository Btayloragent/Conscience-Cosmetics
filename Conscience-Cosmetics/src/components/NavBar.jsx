import React, { useState, useEffect } from 'react';
import logo from '../loginpics/LogoPic4.png';
import UploadButton from '../components/UploadButton.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginComponent from '../components/LoginComponent';

const NavBar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedAvatarUrl = localStorage.getItem('avatarUrl');

    if (savedLoginState === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      if (savedAvatarUrl) setAvatarUrl(savedAvatarUrl);
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        axios
          .get(`http://localhost:5001/api/users/search?q=${searchTerm}`)
          .then((res) => {
            setUserResults(res.data);
            setShowDropdown(true);
          })
          .catch((err) => {
            console.error('Search error:', err);
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

  // When clicking search icon or pressing enter, navigate to search results page or first profile
  const handleSearchClick = () => {
    if (!searchTerm.trim()) return;
    if (userResults.length > 0) {
      // Navigate to the first matched user profile
    navigate(`/profile/${userResults[0].username}`);
      setSearchTerm('');
      setShowDropdown(false);
    } else {
      // Optionally, navigate to a general search page or show "no results"
      alert('No users found');
    }
  };

  const openModal = (mode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginSuccess = (userName, userAvatarUrl) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', userName);
    if (userAvatarUrl) {
      localStorage.setItem('avatarUrl', userAvatarUrl);
    } else {
      localStorage.removeItem('avatarUrl');
    }

    setIsLoggedIn(true);
    setUsername(userName);
    setAvatarUrl(userAvatarUrl || '');

    window.dispatchEvent(new Event('loginStatusChange'));

    closeModal();
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');

    setIsLoggedIn(false);
    setUsername('');
    setAvatarUrl('');

    window.dispatchEvent(new Event('loginStatusChange'));

    navigate('/LogoutPage');
  };

  return (
    <div>
      <div className="navbar bg-white-100 justify-between">
        <div className="flex-none">
          <Link to="/" className="btn btn-ghost">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center relative">
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

          <div className="flex items-center gap-4 ml-14">
            {isLoggedIn ? (
              <div className="flex items-center text-beige hover:text-[#007BFF] space-x-3">
                <Link
                  to={`/profile/${username}`}
                  className="flex items-center space-x-3 hover:underline"
                >
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    />
                  )}
                  <span>Welcome, {username}!</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 text-beige hover:text-[#007BFF]"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => openModal('login')}
                  className="text-beige hover:text-[#007BFF]"
                >
                  Log In
                </button>
                <button
                  onClick={() => openModal('signup')}
                  className="text-beige hover:text-[#007BFF]"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-none gap-1">
          <UploadButton />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          open
          className="modal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            margin: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              width: '400px',
              borderRadius: '8px',
              padding: '20px',
              position: 'relative',
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-6 top-8"
              onClick={closeModal}
              style={{
                border: 'none',
                color: '#D2B48C',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 1050,
              }}
            >
              ✕
            </button>

            <LoginComponent
              mode={authMode}
              onClose={closeModal}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default NavBar;






import React, { useState, useEffect } from 'react';
import logo from '../loginpics/LogoPic4.png';
import UploadButton from '../components/UploadButton.jsx';
import { Link, useNavigate } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');


   useEffect(() => {
  const savedUsername = localStorage.getItem('loggedInUser'); // ← FIXED
  const savedLoginState = localStorage.getItem('isLoggedIn');
  const savedAvatarUrl = localStorage.getItem('userAvatarUrl'); // ← FIXED


    if (savedLoginState === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      if (savedAvatarUrl) setAvatarUrl(savedAvatarUrl);
    }
  }, []);

  // We remove the previous useEffect that sets localStorage because we now manage localStorage explicitly

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      onSearch(searchTerm);
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
    console.log('User logged in:', userName);

    // Store login info in localStorage explicitly before updating state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', userName);
    if (userAvatarUrl) {
      localStorage.setItem('avatarUrl', userAvatarUrl);
    } else {
      localStorage.removeItem('avatarUrl');
    }

    console.log('NavBar: localStorage after login:', {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      username: localStorage.getItem('username'),
      avatarUrl: localStorage.getItem('avatarUrl'),
    });

    setIsLoggedIn(true);
    setUsername(userName);
    setAvatarUrl(userAvatarUrl || '');

    // Dispatch event so SideBar can update
    window.dispatchEvent(new Event('loginStatusChange'));

    closeModal();
  };

  const handleLogout = () => {
    console.log('User logged out');

    // Clear localStorage explicitly first
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');

    console.log('NavBar: localStorage after logout:', {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      username: localStorage.getItem('username'),
      avatarUrl: localStorage.getItem('avatarUrl'),
    });

    setIsLoggedIn(false);
    setUsername('');
    setAvatarUrl('');

    // Dispatch event so SideBar updates
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
              placeholder="Search"
              value={searchTerm}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-white border-black text-black pr-10"
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




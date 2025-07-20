import React, { useState, useEffect } from 'react';
import logo from '../loginpics/LogoPic4.png';
import UploadButton from '../components/UploadButton.jsx';
import { Link, useNavigate } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Load login state and user info on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedLoginState = localStorage.getItem('isLoggedIn');

    if (savedLoginState === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);

      // Fetch full user info from backend to get updated avatarUrl
      axios.get(`http://localhost:5001/api/profile?username=${savedUsername}`)
        .then(res => {
          const avatar = res.data.avatarUrl || '';
          setAvatarUrl(avatar);
          localStorage.setItem('avatarUrl', avatar);
        })
        .catch(() => {
          // fallback to localStorage avatar if API call fails
          const savedAvatar = localStorage.getItem('avatarUrl') || '';
          setAvatarUrl(savedAvatar);
        });
    }
  }, []);

  // Listen for loginStatusChange event (login, logout, avatar update)
  useEffect(() => {
    const handleLoginStatusChange = () => {
      const savedUsername = localStorage.getItem('username');
      const savedLoginState = localStorage.getItem('isLoggedIn');

      setIsLoggedIn(savedLoginState === 'true');
      setUsername(savedUsername || '');

      if (savedLoginState === 'true' && savedUsername) {
        axios.get(`http://localhost:5001/api/profile?username=${savedUsername}`)
          .then(res => {
            const avatar = res.data.avatarUrl || '';
            setAvatarUrl(avatar);
            localStorage.setItem('avatarUrl', avatar);
          })
          .catch(() => {
            const savedAvatar = localStorage.getItem('avatarUrl') || '';
            setAvatarUrl(savedAvatar);
          });
      } else {
        setAvatarUrl('');
      }
    };

    window.addEventListener('loginStatusChange', handleLoginStatusChange);
    return () => {
      window.removeEventListener('loginStatusChange', handleLoginStatusChange);
    };
  }, []);

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
          {/* Insert SearchBar here */}
          <SearchBar />

          <div className="flex items-center gap-4 ml-14">
            {isLoggedIn ? (
              <div className="flex items-center text-beige hover:text-[#007BFF] space-x-3">
                <Link
                  to={`/profile/${username}`}
                  className="flex items-center space-x-3 hover:underline"
                >
                  {avatarUrl && (
                    <img
                      src={avatarUrl.startsWith('http') ? avatarUrl : `http://localhost:5001${avatarUrl}`}
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







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComPic4 from '../pictures/LoginComPics/ComPic4.png'; 

const LoginComponent = ({ mode, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);

  // Avatar selection (1–99)
  const [avatarId, setAvatarId] = useState(1);
  const getAvatarUrl = (id) => `https://avatar.iran.liara.run/public/${id}.png`;
  const selectedAvatar = getAvatarUrl(avatarId);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const url =
        currentMode === 'login'
          ? 'http://localhost:5001/login'
          : 'http://localhost:5001/signup';

      const payload =
        currentMode === 'login'
          ? { username, password }
          : { username, password, email, avatarUrl: selectedAvatar };

      const response = await axios.post(url, payload);

      if (response.status === 200) {
        const { token, user } = response.data;

        if (!user || !user._id) {
          throw new Error('User data missing from server response');
        }

        // Save login info safely
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event('loginStatusChange'));

        alert(`${currentMode === 'login' ? 'Login' : 'Sign Up'} successful!`);

        const avatarUrl = user.avatarUrl || selectedAvatar;

        // Pass user info back
        onLoginSuccess(user.username, avatarUrl, user._id, token);
        onClose();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        currentMode === 'login'
          ? 'Invalid username or password.'
          : 'Sign up failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const switchMode = (newMode) => {
    setCurrentMode(newMode);
    setIndicatorPosition(newMode === 'login' ? 0 : 50);
  };

  useEffect(() => {
    setIndicatorPosition(currentMode === 'login' ? 0 : 50);
  }, [currentMode]);

  return (
    <div
      style={{
        backgroundImage: `url(${ComPic4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        position: 'relative',
        color: '#000',
        backdropFilter: 'brightness(0.25)',
      }}
    >
      {/* Tabs */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div
            onClick={() => switchMode('login')}
            style={{
              marginRight: '20px',
              fontWeight: currentMode === 'login' ? 'bold' : 'normal',
              color: '#D2B48C',
              cursor: 'pointer',
            }}
          >
            Login
          </div>
          <div
            onClick={() => switchMode('signup')}
            style={{
              fontWeight: currentMode === 'signup' ? 'bold' : 'normal',
              color: '#4DA6FF',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </div>
        </div>

        {/* Indicator */}
        <div
          style={{
            height: '4px',
            backgroundColor: '#D2B48C',
            width: '50%',
            position: 'absolute',
            bottom: '0',
            left: `${indicatorPosition}%`,
            transition: 'left 0.3s ease',
          }}
        />
      </div>

      {/* Title */}
      <div style={{ marginBottom: '10px', fontSize: '24px', color: '#D2B48C' }}>
        {currentMode === 'login' ? 'Login To Conscience Cosmetics' : 'Create an Account'}
      </div>

      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Inputs */}
      <input
        type="text"
        placeholder="Username"
        style={inputStyle}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        style={inputStyle}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {currentMode === 'signup' && (
        <>
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            style={inputStyle}
          />
        </>
      )}

      {/* Avatar Selection */}
      {currentMode === 'signup' && (
        <div
          style={{
            margin: '20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <button
            onClick={() => setAvatarId((prev) => (prev <= 1 ? 99 : prev - 1))}
            style={arrowButtonStyle}
          >
            ◀
          </button>
          <img
            src={selectedAvatar}
            alt="Selected Avatar"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '2px solid #D2B48C',
            }}
          />
          <button
            onClick={() => setAvatarId((prev) => (prev >= 99 ? 1 : prev + 1))}
            style={arrowButtonStyle}
          >
            ▶
          </button>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          backgroundColor: 'rgba(8, 94, 192, 0.95)',
          color: 'white',
          cursor: 'pointer',
        }}
        disabled={isLoading}
      >
        {currentMode === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </div>
  );
};

// Styles
const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid black',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: 'black',
};

const arrowButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#D2B48C',
};

export default LoginComponent;





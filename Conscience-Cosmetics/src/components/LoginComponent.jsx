import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginComponent = ({ mode, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);

  // Avatar selection
  const [avatarIndex, setAvatarIndex] = useState(0);
  const getAvatarUrl = (index) => `https://avatar.iran.liara.run/public/girl?index=${index}&gender=female`;
  const [selectedAvatar, setSelectedAvatar] = useState(getAvatarUrl(avatarIndex));

  useEffect(() => {
    setSelectedAvatar(getAvatarUrl(avatarIndex));
  }, [avatarIndex]);

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
    : { username, password, email, avatarUrl: selectedAvatar };  // Use avatarUrl here


      const response = await axios.post(url, payload);

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        alert(`${currentMode === 'login' ? 'Login' : 'Sign Up'} successful!`);
        onLoginSuccess(user.username);
        onClose();
      }
    } catch (error) {
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
        backgroundColor: '#f9f6f0',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        position: 'relative',
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
        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={() => setAvatarIndex((prev) => (prev - 1 + 10) % 10)}
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
            onClick={() => setAvatarIndex((prev) => (prev + 1) % 10)}
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
          backgroundColor: 'rgba(8, 94, 192, 0.5)',
          color: 'white',
          cursor: 'pointer',
        }}
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

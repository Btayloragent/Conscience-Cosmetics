import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginComponent = ({ mode, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode); // Track the current mode locally

  // Handle form submission (Login or Signup)
  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const url = currentMode === 'login' ? 'http://localhost:5001/login' : 'http://localhost:5001/signup';
      const payload = currentMode === 'login' ? { username, password } : { username, password, email };
      const response = await axios.post(url, payload);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        alert(`${currentMode === 'login' ? 'Login' : 'Sign Up'} successful!`);
        onClose(); // Close modal on success
      }
    } catch (error) {
      setErrorMessage(currentMode === 'login' ? 'Invalid username or password.' : 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logic for switching between Login/Signup modes
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const switchMode = (newMode) => {
    setCurrentMode(newMode); // Update the local mode state
    setIndicatorPosition(newMode === 'login' ? 0 : 50); // Set the indicator position
  };

  // Use Effect to sync the initial mode and indicator position when the component loads
  useEffect(() => {
    setIndicatorPosition(currentMode === 'login' ? 0 : 50);
  }, [currentMode]);

  return (
    <div
      style={{
        backgroundColor: '#f9f6f0', // Soft Beige (background color restored)
        borderRadius: '18px', // Rounded corners
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%', // Full width of container
        maxWidth: '400px', // Max width to keep it consistent
        textAlign: 'center',
        position: 'relative', // For the positioning of the close button
      }}
    >
      {/* Tab Section (Login/Signup tabs) */}
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
            className="tab"
          >
            Login
          </div>
          <div
            onClick={() => switchMode('signup')}
            style={{
              fontWeight: currentMode === 'signup' ? 'bold' : 'normal',
              color: '#D2B48C',
              cursor: 'pointer',
            }}
            className="tab"
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
            left: `${indicatorPosition}%`, // Set position based on the mode
            transition: 'left 0.3s ease', // Smooth transition
          }}
        />
      </div>

      {/* Title */}
      <div style={{ marginBottom: '10px', fontSize: '24px', color: '#D2B48C' }}>
        {currentMode === 'login' ? 'Login To Conscience Cosmetics' : 'Create an Account'}
      </div>
      
      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Username and Password Inputs */}
      <input
        type="text"
        placeholder="Username"
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '4px',
          border: '1px solid black',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background for inputs
          color: 'black',
        }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '4px',
          border: '1px solid black',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background for inputs
          color: 'black',
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Additional Inputs for Sign Up */}
      {currentMode === 'signup' && (
        <input
          type="email"
          placeholder="Email"
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            border: '1px solid black',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background for inputs
            color: 'black',
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      {currentMode === 'signup' && (
        <input
          type="password"
          placeholder="Confirm Password"
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            border: '1px solid black',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background for inputs
            color: 'black',
          }}
        />
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          backgroundColor: 'rgba(210, 180, 140, 0.5)',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        {currentMode === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </div>
  );
};

export default LoginComponent;

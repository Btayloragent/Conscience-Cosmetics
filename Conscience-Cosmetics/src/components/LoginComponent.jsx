import React, { useState } from 'react';
import axios from 'axios'; // To make API requests

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loginContainerStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))',
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '400px',
        textAlign: 'center',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#D2B48C',
        transition: 'border-color 0.3s',
    };

    const inputFocusStyle = {
        borderColor: '#D2B48C',
    };

    const buttonBaseStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: 'rgba(210, 180, 140, 0.5)',
        border: 'none',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.1s, box-shadow 0.3s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    };

    const buttonHoverStyle = {
        backgroundColor: 'rgba(210, 180, 140, 0.7)',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
    };

    const buttonActiveStyle = {
        backgroundColor: 'rgba(210, 180, 140, 0.9)',
        transform: 'scale(0.95)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    };

    const titleStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#D2B48C',
    };

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
        e.target.style.boxShadow = buttonHoverStyle.boxShadow;
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = buttonBaseStyle.backgroundColor;
        e.target.style.boxShadow = buttonBaseStyle.boxShadow;
    };

    const handleMouseDown = (e) => {
        e.target.style.backgroundColor = buttonActiveStyle.backgroundColor;
        e.target.style.transform = 'scale(0.95)';
    };

    const handleMouseUp = (e) => {
        e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
        e.target.style.transform = 'scale(1)';
    };

    const handleInputFocus = (e) => {
        e.target.style.borderColor = inputFocusStyle.borderColor;
    };

    const handleInputBlur = (e) => {
        e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    };

    // Handle Login Submission
    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5001/login', { username, password });

            // If login is successful, store the token in localStorage
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token); // Store JWT in localStorage
                alert('Login successful!');
                // You can also redirect to another page here, like the homepage
            }
        } catch (error) {
            setErrorMessage('Invalid username or password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={loginContainerStyle}>
            <div style={titleStyle}>Login</div>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <input
                type="text"
                placeholder="Username"
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                style={buttonBaseStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={handleSubmit}
                disabled={isLoading} // Disable button when loading
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
};

export default LoginComponent;

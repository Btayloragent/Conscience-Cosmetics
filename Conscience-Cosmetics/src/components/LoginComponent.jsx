import React, { useState } from 'react';
import axios from 'axios';

const LoginModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const modalStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 1000, // Ensure it sits above other content
    };

    const containerStyle = {
        position: 'relative',
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '400px',
        maxWidth: '90%',
        textAlign: 'center',
        backgroundColor: '#f9f6f0', // Soft Beige
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid black',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
    };

    const titleStyle = {
        marginBottom: '10px',
        fontSize: '24px',
        color: '#D2B48C',
    };

    const tabStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        cursor: 'pointer',
        marginBottom: '10px',
        color: '#D2B48C',
        position: 'relative',
    };

    const activeTabStyle = {
        fontWeight: 'bold',
    };

    const indicatorStyle = {
        height: '4px',
        backgroundColor: '#D2B48C',
        width: '50%',
        position: 'absolute',
        bottom: '0',
        left: isLoginMode ? '0%' : '50%',
        transition: 'left 0.6s',
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const url = isLoginMode ? 'http://localhost:5001/login' : 'http://localhost:5001/signup';
            const payload = isLoginMode ? { username, password } : { username, password, email };
            const response = await axios.post(url, payload);

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                alert(`${isLoginMode ? 'Login' : 'Sign up'} successful!`);
                onClose(); // Close modal on success
            }
        } catch (error) {
            setErrorMessage(isLoginMode ? 'Invalid username or password.' : 'Sign up failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={modalStyle}>
            <div style={containerStyle}>
                <button
                    type="button"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#D2B48C',
                        fontSize: '18px',
                    }}
                    onClick={onClose}
                >
                    ✕
                </button>
                <div style={tabStyle}>
                    <div 
                        style={{ ...activeTabStyle, fontWeight: isLoginMode ? 'bold' : 'normal' }} 
                        onClick={() => setIsLoginMode(true)}
                    >
                        Login
                    </div>
                    <div 
                        style={{ ...activeTabStyle, fontWeight: !isLoginMode ? 'bold' : 'normal' }} 
                        onClick={() => setIsLoginMode(false)}
                    >
                        Sign Up
                    </div>
                    <div style={indicatorStyle} />
                </div>
                <div style={titleStyle}>{isLoginMode ? 'Login To Conscience Cosmetics' : 'Create an Account'}</div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {isLoginMode ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
                            style={inputStyle}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            style={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            style={inputStyle}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            style={inputStyle}
                        />
                    </>
                )}

                <button
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: 'rgba(210, 180, 140, 0.5)', color: 'white', cursor: 'pointer' }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (isLoginMode ? 'Logging in...' : 'Signing up...') : (isLoginMode ? 'Login' : 'Sign Up')}
                </button>
            </div>
        </div>
    );
};

export default LoginModal;


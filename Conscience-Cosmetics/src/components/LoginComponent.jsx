import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // New state for email
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const containerStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '400px',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        transition: 'border-color 0.3s',
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
        width: '50%', // Adjust width to half for two tabs
        position: 'absolute',
        bottom: '0',
        left: isLoginMode ? '0%' : '50%', // Move indicator based on active tab
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
            }
        } catch (error) {
            setErrorMessage(isLoginMode ? 'Invalid username or password.' : 'Sign up failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={tabStyle}>
                <div 
                    style={{ ...activeTabStyle }} 
                    onClick={() => setIsLoginMode(true)}
                >
                    Login
                </div>
                <div 
                    style={{ ...activeTabStyle }} 
                    onClick={() => setIsLoginMode(false)}
                >
                    Sign Up
                </div>
                <div style={indicatorStyle} />
            </div>
            <div style={titleStyle}>{isLoginMode ? 'Login To Conscience Cosmetics' : 'Create a Account '}</div>
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
    );
};

export default LoginComponent;

import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = ({ isLoginMode, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '10px', fontSize: '24px', color: '#D2B48C' }}>
                {isLoginMode ? 'Login To Conscience Cosmetics' : 'Create an Account'}
            </h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {isLoginMode ? (
                <>
                    <input
                        type="text"
                        placeholder="Username"
                        style={{
                            width: '100%',
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '4px',
                            border: '1px solid black',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: 'black',
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Username"
                        style={{
                            width: '100%',
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '4px',
                            border: '1px solid black',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: 'black',
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        style={{
                            width: '100%',
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '4px',
                            border: '1px solid black',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: 'black',
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: 'black',
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        style={{
                            width: '100%',
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '4px',
                            border: '1px solid black',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            color: 'black',
                        }}
                    />
                </>
            )}

            <button
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(210, 180, 140, 0.5)',
                    color: 'white',
                    cursor: 'pointer',
                }}
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (isLoginMode ? 'Logging in...' : 'Signing up...') : (isLoginMode ? 'Login' : 'Sign Up')}
            </button>
        </div>
    );
};

export default LoginComponent;

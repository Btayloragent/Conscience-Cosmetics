import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';

const MakeUpPage = () => {
    const navigate = useNavigate();

    const backgroundImageStyle = {
        backgroundImage: 'url(src/Loginpics/LoginIn11.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        position: 'relative',
        color: '#D2B48C',
    };

    const heroOverlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    };

    const goBackButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
    };

    const arrowStyle = {
        marginRight: '8px',
        fontSize: '20px',
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div style={backgroundImageStyle}>
            <div style={heroOverlayStyle}></div>
            <button style={goBackButtonStyle} onClick={handleGoBack}>
                <span style={arrowStyle}>&larr;</span> Go Back to Home
            </button>
            <LoginComponent />
        </div>
    );
};

export default MakeUpPage;

 









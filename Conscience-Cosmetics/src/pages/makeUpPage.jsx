import React from 'react';
import LoginComponent from '../components/LoginComponent';


const MakeUpPage = () => {
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

    return (
        <div style={backgroundImageStyle}>
            <div style={heroOverlayStyle}></div>
            <LoginComponent />
        </div>
    );
};

export default MakeUpPage;

 









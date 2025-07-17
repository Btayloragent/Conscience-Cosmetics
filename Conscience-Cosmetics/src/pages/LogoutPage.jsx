import React from 'react';
import Footer from '../components/Footer'; // Import the Footer component
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const LogOutPage = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url(src/pictures/FavPics/Fav6.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '120vh',
    width: '100%',
    position: 'relative',
    color: '#D2B48C',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
    padding: '20px',
  };

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    marginTop: '2rem',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#ffffffcc',
    color: '#333',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={backgroundImageStyle}>
      <NavBar />
      <SideBar />
      <div style={contentStyle}>
        <div style={iconStyle}>👋</div>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'serif' }}>
          Goodbye for now!
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '500px', marginTop: '1rem' }}>
          You've successfully signed out on this device. Sign back in to get access to all of your photos, travel plans, and everything else you have saved on your account.
        </p>
        <button
          style={buttonStyle}
          onClick={() => window.location.href = '/login'}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#eee')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#ffffffcc')}
        >
          Sign In
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LogOutPage;











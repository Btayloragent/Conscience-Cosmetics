import React from 'react';

const LandingPage = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url(src/pictures/landingPic.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative',
    color: '#D2B48C',
  };

  const conscienceStyle = {
    position: 'absolute',
    left: '3%',
    top: '25%',
    fontSize: '5vw',
    textAlign: 'left',
    fontFamily: 'Serif',
  };

  const cosmeticsStyle = {
    position: 'absolute',
    right: '3%',
    top: '55%',
    fontSize: '5vw',
    textAlign: 'right',
    fontFamily: 'Serif',
  };

  const heroOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  const heroContentStyle = {
    position: 'absolute',
    top: '50%',
    left: '48%', // Shift slightly to the left by decreasing the left value
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
    maxWidth: '600px',
    paddingLeft: '10px', // Optional: Adds extra padding to fine-tune the shift
  };
  return (
    <div style={backgroundImageStyle}>
      <div style={heroOverlayStyle}></div>
      
      {/* Login Button positioned at the top right */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button 
          className="btn btn-outline btn-primary"
          onClick={() => window.location.href = '/login'}
        >
          Login
        </button>
      </div>
  
      <div style={heroContentStyle}>
        <h1 className="mb-5 text-5xl font-bold">Welcome to Conscience Cosmetics!</h1>
        <p className="mb-5">
          Explore ethical beauty and a community that reflects your values!
        </p>
        <button className="btn btn-outline btn-error">Get Started</button>
      </div>
      
      <h1 style={conscienceStyle}>Conscience</h1>
      <h1 style={cosmeticsStyle}>Cosmetics</h1>
    </div>
  );
  
};

export default LandingPage;



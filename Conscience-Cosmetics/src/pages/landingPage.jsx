import React from 'react';
import { Link } from "react-router-dom";
import Footer from '../components/Footer'; // Import the Footer component

const LandingPage = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url(src/pictures/landingPic.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative',
    color: '#D2B48C',
    fontFamily: "Merriweather, serif", // Apply Merriweather here
  };

  const conscienceStyle = {
    position: 'absolute',
    left: '3%',
    top: '25%',
    fontSize: '5vw',
    textAlign: 'left',
    fontFamily: "Merriweather, serif", // Apply Merriweather here
  };

  const cosmeticsStyle = {
    position: 'absolute',
    right: '3%',
    top: '55%',
    fontSize: '5vw',
    textAlign: 'right',
    fontFamily: "Merriweather, serif", // Apply Merriweather here
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
    left: '48%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
    maxWidth: '600px',
    paddingLeft: '50px',
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={heroContentStyle}>
        <h1 className="mb-5 text-5xl font-bold">Welcome to Conscience Cosmetics!</h1>
        <p className="mb-5">
          Explore ethical beauty and a community that reflects your values!
        </p>
        <Link to="/MakeUpPage">
          <button className="btn btn-outline btn-error">Get Started</button>
        </Link>
        <Footer /> {/* Add the Footer component here */}
      </div>
      <h1 style={conscienceStyle}>Conscience</h1>
      <h1 style={cosmeticsStyle}>Cosmetics</h1>
    </div>
  );
};

export default LandingPage;




import React from 'react';
import Footer from '../components/Footer'; // Import the Footer component
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const FavsPage = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url(src/pictures/FavPics/Fav6.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative',
    color: '#D2B48C',
  };

  return (
    <div style={backgroundImageStyle}>
      {/* You can add other content here if needed */}
      <NavBar/>
      <SideBar/>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
};

export default FavsPage;


 









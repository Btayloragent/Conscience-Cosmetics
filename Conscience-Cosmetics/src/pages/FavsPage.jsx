import React from 'react';
import Footer from '../components/Footer'; // Import the Footer component
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import LoadMoreButton from '../components/LoadMoreButton'; // Import the Load More Button

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

  const handleLoadMore = () => {
    // Add your load more logic here
    console.log("Load more items...");
  };

  return (
    <div style={backgroundImageStyle}>
      <NavBar />
      <SideBar />
      <h1 style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        fontSize: '3rem', 
        fontWeight: 'bold', 
        fontFamily: 'Serif' // Add the serif font here
      }}>
        Favorites
      </h1>
      <LoadMoreButton onClick={handleLoadMore} /> {/* Added Load More Button */}
      <Footer />
    </div>
  );
};

export default FavsPage;











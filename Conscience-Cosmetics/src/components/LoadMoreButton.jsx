import React from 'react';

const LoadMoreButton = () => {
  const buttonColor = '#D2B48C'; // Replace this with your actual color

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button 
        className="btn btn-block" 
        style={{ 
          width: '700px', 
          height: '40px', 
          fontSize: '16px', 
          fontFamily: 'Serif', // Add the serif font here
          backgroundColor: buttonColor, 
          color: '#ffffff' // Change text color if needed
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;



  
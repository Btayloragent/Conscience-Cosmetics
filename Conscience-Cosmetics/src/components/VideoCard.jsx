import React, { useState, useRef } from 'react';
import Rating from './Rating'; // Import your Rating component

function VideoCard({ videoThumbnail, videoFile }) {
  const [isTextareaVisible, setTextareaVisible] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  const toggleTextarea = () => {
    setTextareaVisible(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Textarea submitted:", textareaValue);
    setTextareaVisible(false);
    setTextareaValue("");
  };

  const handleCancel = () => {
    setTextareaVisible(false);
    setTextareaValue("");
  };

  return (
    <div 
      className="card bg-base-100 shadow-xl inline-block p-0 m-0 rounded-lg"
      style={{
        width: '100%', // Ensure the card takes full width
        maxWidth: '400px', // Optional: Set a max width for your card
        margin: '0 auto' // Center the card if needed
      }}
    >
      <div 
        className="relative rounded-lg overflow-hidden"
        style={{ position: 'relative' }}
      >
        <video
          src={videoFile}
          controls
          poster={videoThumbnail}
          className="rounded-lg"
          style={{
            width: '100%', // Ensure the video takes full width
            height: '300px', // Fixed height for consistent size
            objectFit: 'cover', // Keep the aspect ratio and avoid distortion
            margin: 0,
            padding: 0,
            borderRadius: '0.5rem' // Make sure video has rounded corners
          }}
        >
          Your browser does not support the video tag.
        </video>
        {!isTextareaVisible && (
          <button 
            className="btn btn-xs px-2 py-1 text-xs absolute bottom-2 right-2 rounded-lg bg-transparent text-white border border-white"
            onClick={toggleTextarea}
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              padding: '4px 8px',
              fontSize: '0.75rem',
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid white',
              borderRadius: '0.5rem',
            }}
          >
            Comment
          </button>
        )}
      </div>
      {isTextareaVisible && (
        <div 
          className="relative p-4 rounded-lg bg-white"
          style={{
            position: 'relative',
            padding: '16px',
            borderRadius: '0.5rem',
            backgroundColor: 'white'
          }}
        >
          {/* Rating Component */}
          <div className="flex justify-center mb-4">
            <Rating />
          </div>
          <textarea
            ref={textareaRef}
            className="textarea textarea-bordered w-full rounded-lg"
            placeholder="Write your comment..."
            value={textareaValue}
            onChange={handleTextareaChange}
            style={{
              width: '100%',
              borderRadius: '0.5rem',
              resize: 'none',
              overflow: 'hidden',
              padding: '8px',
              marginBottom: '8px',
              height: '80px'
            }}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              className="btn btn-xs px-2 py-1 text-xs rounded-lg bg-transparent text-red-500 border border-red-500 mr-2"
              onClick={handleCancel}
              style={{
                fontSize: '0.75rem',
                padding: '4px 8px',
                border: '1px solid red',
                borderRadius: '0.5rem',
                color: 'red',
                marginRight: '8px',
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-xs px-2 py-1 text-xs rounded-lg bg-green-500 text-white border border-green-500"
              onClick={handleSubmit}
              style={{
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '0.5rem',
                backgroundColor: 'green',
                color: 'white',
                border: '1px solid green',
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="card-body p-0">
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}

export default VideoCard;
